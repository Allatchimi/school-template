"use client";

import SelectLabelSchedule from "@/components/form-item/select-label/school/common/select-label-schedule";
import { ScheduleListRequest } from "@/lib/api/school/common/schedule/request";
import {
  ScheduleResponse,
  ScheduleListResponse,
} from "@/lib/api/school/common/schedule/response";
import { getScheduleList } from "@/lib/api/school/common/schedule/routes";
import {
  SCHOOL_TYPE_UNIVERSITY,
  SCHOOL_TYPE_HIGHSCHOOL,
} from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectSchedule(
  props: FormItemSelectFetchProps<
    ScheduleResponse,
    ScheduleListRequest,
    ScheduleListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      ScheduleResponse,
      ScheduleListRequest,
      ScheduleListResponse
    >
      {...props}
      name={props.name || "scheduleID"}
      label={props.label || tWords("schedule")}
      placeholder={props.placeholder || tWords("schedule")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("schedule") })
      }
      getItemList={getScheduleList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelSchedule item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (data?: ScheduleResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const type = item.type || {
        name: tWords("invalidLabel", { label: tWords("type") }),
      };
      const dayOfTheWeek =
        item.dayOfTheWeek ||
        tWords("invalidLabel", { label: tWords("dayOfTheWeek") });
      const startTime =
        item.startTime?.toString() ||
        tWords("invalidLabel", { label: tWords("startTime") });

      const endTime =
        item.endTime?.toString() ||
        tWords("invalidLabel", { label: tWords("endTime") });

      const classSubjectUnit =
        item?.school?.type === SCHOOL_TYPE_UNIVERSITY
          ? `(${item.unit?.name || tWords("invalidLabel", { label: tWords("unit") })})`
          : item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
            ? `(${item.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
                item.classSubject?.class?.name ||
                tWords("invalidLabel", { label: tWords("class") })
              })`
            : "";
      return {
        data: item,
        label: `${type} ${dayOfTheWeek} ${startTime} - ${endTime} ${
          classSubjectUnit.length > 0 ? `(${classSubjectUnit})` : ""
        }`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
