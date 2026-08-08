"use client";

import SelectLabelYear from "@/components/form-item/select-label/school/common/select-label-year";
import { YearListRequest } from "@/lib/api/school/common/year/request";
import {
  YearResponse,
  YearListResponse,
} from "@/lib/api/school/common/year/response";
import { getYearList } from "@/lib/api/school/common/year/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectYear(
  props: FormItemSelectFetchProps<
    YearResponse,
    YearListRequest,
    YearListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<YearResponse, YearListRequest, YearListResponse>
      {...props}
      name={props.name || "yearID"}
      label={props.label || tWords("year")}
      placeholder={props.placeholder || tWords("year")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("year") })
      }
      getItemList={getYearList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelYear item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: YearResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: item.name || tWords("invalidLabel", { label: tWords("year") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
