"use client";

import SelectLabelMeeting from "@/components/form-item/select-label/school/common/select-label-meeting";
import { MeetingListRequest } from "@/lib/api/school/common/meeting/request";
import {
  MeetingResponse,
  MeetingListResponse,
} from "@/lib/api/school/common/meeting/response";
import { getMeetingList } from "@/lib/api/school/common/meeting/routes";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectMeeting(
  props: FormItemSelectFetchProps<
    MeetingResponse,
    MeetingListRequest,
    MeetingListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      MeetingResponse,
      MeetingListRequest,
      MeetingListResponse
    >
      {...props}
      name={props.name || "meetingID"}
      label={props.label || tWords("meeting")}
      placeholder={props.placeholder || tWords("meeting")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("meeting") })
      }
      getItemList={getMeetingList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelMeeting item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: MeetingResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const apiRoomID =
        item.apiRoomID ||
        tWords("invalidLabel", { label: tWords("apiRoomID") });
      const classSubjectUnit =
        item?.school?.type === SCHOOL_TYPE_UNIVERSITY
          ? `(${item.unit?.name || tWords("invalidLabel", { label: tWords("unit") })})`
          : `(${item.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
              item.classSubject?.class?.name ||
              tWords("invalidLabel", { label: tWords("class") })
            })`;
      return {
        data: item,
        label: `${apiRoomID} (${classSubjectUnit})`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
