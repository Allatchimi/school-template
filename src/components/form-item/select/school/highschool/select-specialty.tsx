"use client";

import SelectLabelSpecialty from "@/components/form-item/select-label/school/highschool/select-label-specialty";
import { SpecialtyListRequest } from "@/lib/api/school/highschool/specialty/request";
import {
  SpecialtyResponse,
  SpecialtyListResponse,
} from "@/lib/api/school/highschool/specialty/response";
import { getSpecialtyList } from "@/lib/api/school/highschool/specialty/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectSpecialty(
  props: FormItemSelectFetchProps<
    SpecialtyResponse,
    SpecialtyListRequest,
    SpecialtyListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      SpecialtyResponse,
      SpecialtyListRequest,
      SpecialtyListResponse
    >
      {...props}
      name={props.name || "specialtyID"}
      label={props.label || tWords("specialty")}
      placeholder={props.placeholder || tWords("specialty")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("specialty") })
      }
      getItemList={getSpecialtyList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelSpecialty item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: SpecialtyResponse[] | null,
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
          item.name || tWords("invalidLabel", { label: tWords("specialty") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
