"use client";

import SelectLabelSemester from "@/components/form-item/select-label/school/university/select-label-semester";
import { SemesterListRequest } from "@/lib/api/school/university/semester/request";
import {
  SemesterResponse,
  SemesterListResponse,
} from "@/lib/api/school/university/semester/response";
import { getSemesterList } from "@/lib/api/school/university/semester/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectSemester(
  props: FormItemSelectFetchProps<
    SemesterResponse,
    SemesterListRequest,
    SemesterListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      SemesterResponse,
      SemesterListRequest,
      SemesterListResponse
    >
      {...props}
      name={props.name || "semesterID"}
      label={props.label || tWords("semester")}
      placeholder={props.placeholder || tWords("semester")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("semester") })
      }
      getItemList={getSemesterList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelSemester item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: SemesterResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label:
          item.name || tWords("invalidLabel", { label: tWords("semester") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
