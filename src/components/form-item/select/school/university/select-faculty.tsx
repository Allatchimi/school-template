"use client";

import SelectLabelFaculty from "@/components/form-item/select-label/school/university/select-label-faculty";
import { FacultyListRequest } from "@/lib/api/school/university/faculty/request";
import {
  FacultyResponse,
  FacultyListResponse,
} from "@/lib/api/school/university/faculty/response";
import { getFacultyList } from "@/lib/api/school/university/faculty/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectFaculty(
  props: FormItemSelectFetchProps<
    FacultyResponse,
    FacultyListRequest,
    FacultyListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      FacultyResponse,
      FacultyListRequest,
      FacultyListResponse
    >
      {...props}
      name={props.name || "facultyID"}
      label={props.label || tWords("faculty")}
      placeholder={props.placeholder || tWords("faculty")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("faculty") })
      }
      getItemList={getFacultyList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelFaculty item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: FacultyResponse[] | null,
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
          item.name || tWords("invalidLabel", { label: tWords("faculty") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
