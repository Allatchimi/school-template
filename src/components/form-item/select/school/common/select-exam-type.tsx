"use client";

import SelectLabelExamType from "@/components/form-item/select-label/school/common/select-label-exam-type";
import { ExamTypeListRequest } from "@/lib/api/school/common/exam/request";
import {
  ExamTypeResponse,
  ExamTypeListResponse,
} from "@/lib/api/school/common/exam/response";
import { getExamTypeList } from "@/lib/api/school/common/exam/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectExamType(
  props: FormItemSelectFetchProps<
    ExamTypeResponse,
    ExamTypeListRequest,
    ExamTypeListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      ExamTypeResponse,
      ExamTypeListRequest,
      ExamTypeListResponse
    >
      {...props}
      name={props.name || "typeID"}
      label={props.label || tWords("examType")}
      placeholder={props.placeholder || tWords("examType")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("examType") })
      }
      getItemList={getExamTypeList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelExamType item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: ExamTypeResponse[] | null,
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
          item.name || tWords("invalidLabel", { label: tWords("examType") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
