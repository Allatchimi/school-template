"use client";

import SelectLabelClassSubject from "@/components/form-item/select-label/school/highschool/select-label-class-subject";
import { ClassSubjectListRequest } from "@/lib/api/school/highschool/class/request";
import {
  ClassSubjectResponse,
  ClassSubjectListResponse,
} from "@/lib/api/school/highschool/class/response";
import { getClassSubjectList } from "@/lib/api/school/highschool/class/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectClassSubject(
  props: FormItemSelectFetchProps<
    ClassSubjectResponse,
    ClassSubjectListRequest,
    ClassSubjectListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      ClassSubjectResponse,
      ClassSubjectListRequest,
      ClassSubjectListResponse
    >
      {...props}
      name={props.name || "classSubjectID"}
      label={props.label || tWords("subject")}
      placeholder={props.placeholder || tWords("subject")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("subject") })
      }
      getItemList={getClassSubjectList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelClassSubject item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: ClassSubjectResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: `${
          item.subject?.name ||
          tWords("invalidLabel", { label: tWords("subject") })
        }, ${item.class?.name || tWords("invalidLabel", { label: tWords("class") })} - ${
          item.class?.specialty?.name ||
          tWords("invalidLabel", { label: tWords("specialty") })
        }, ${item.class?.specialty?.section?.name || tWords("invalidLabel", { label: tWords("section") })}`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
