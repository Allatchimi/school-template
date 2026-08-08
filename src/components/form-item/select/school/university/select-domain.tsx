"use client";

import SelectLabelDomain from "@/components/form-item/select-label/school/university/select-label-domain";
import { DomainListRequest } from "@/lib/api/school/university/domain/request";
import {
  DomainResponse,
  DomainListResponse,
} from "@/lib/api/school/university/domain/response";
import { getDomainList } from "@/lib/api/school/university/domain/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectDomain(
  props: FormItemSelectFetchProps<
    DomainResponse,
    DomainListRequest,
    DomainListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<DomainResponse, DomainListRequest, DomainListResponse>
      {...props}
      name={props.name || "domainID"}
      label={props.label || tWords("domain")}
      placeholder={props.placeholder || tWords("domain")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("domain") })
      }
      getItemList={getDomainList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelDomain item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: DomainResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: item.name || tWords("invalidLabel", { label: tWords("domain") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
