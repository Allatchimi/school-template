"use client";

import SelectLabelSection from "@/components/form-item/select-label/school/highschool/select-label-section";
import { SectionListRequest } from "@/lib/api/school/highschool/section/request";
import {
  SectionResponse,
  SectionListResponse,
} from "@/lib/api/school/highschool/section/response";
import { getSectionList } from "@/lib/api/school/highschool/section/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectSection(
  props: FormItemSelectFetchProps<
    SectionResponse,
    SectionListRequest,
    SectionListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      SectionResponse,
      SectionListRequest,
      SectionListResponse
    >
      {...props}
      name={props.name || "sectionID"}
      label={props.label || tWords("section")}
      placeholder={props.placeholder || tWords("section")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("section") })
      }
      getItemList={getSectionList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelSection item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: SectionResponse[] | null,
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
          item.name || tWords("invalidLabel", { label: tWords("section") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
