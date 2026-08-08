"use client";

import SelectLabelQuarter from "@/components/form-item/select-label/school/highschool/select-label-quarter";
import { QuarterListRequest } from "@/lib/api/school/highschool/quarter/request";
import {
  QuarterResponse,
  QuarterListResponse,
} from "@/lib/api/school/highschool/quarter/response";
import { getQuarterList } from "@/lib/api/school/highschool/quarter/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectQuarter(
  props: FormItemSelectFetchProps<
    QuarterResponse,
    QuarterListRequest,
    QuarterListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      QuarterResponse,
      QuarterListRequest,
      QuarterListResponse
    >
      {...props}
      name={props.name || "quarterID"}
      label={props.label || tWords("quarter")}
      placeholder={props.placeholder || tWords("quarter")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("quarter") })
      }
      getItemList={getQuarterList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelQuarter item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: QuarterResponse[] | null,
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
          item.name || tWords("invalidLabel", { label: tWords("quarter") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
