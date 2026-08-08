"use client";

import SelectLabelSubject from "@/components/form-item/select-label/school/highschool/select-label-subject";
import { SubjectListRequest } from "@/lib/api/school/highschool/subject/request";
import {
  SubjectResponse,
  SubjectListResponse,
} from "@/lib/api/school/highschool/subject/response";
import { getSubjectList } from "@/lib/api/school/highschool/subject/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectSubject(
  props: FormItemSelectFetchProps<
    SubjectResponse,
    SubjectListRequest,
    SubjectListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      SubjectResponse,
      SubjectListRequest,
      SubjectListResponse
    >
      {...props}
      name={props.name || "subjectID"}
      label={props.label || tWords("subject")}
      placeholder={props.placeholder || tWords("subject")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("subject") })
      }
      getItemList={getSubjectList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelSubject item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: SubjectResponse[] | null,
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
          item.name || tWords("invalidLabel", { label: tWords("subject") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
