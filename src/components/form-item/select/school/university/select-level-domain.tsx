"use client";

import SelectLabelLevelDomain from "@/components/form-item/select-label/school/university/select-label-level-domain";
import { LevelDomainListRequest } from "@/lib/api/school/university/level/request";
import {
  LevelDomainResponse,
  LevelDomainListResponse,
} from "@/lib/api/school/university/level/response";
import { getLevelDomainList } from "@/lib/api/school/university/level/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectLevelDomain(
  props: FormItemSelectFetchProps<
    LevelDomainResponse,
    LevelDomainListRequest,
    LevelDomainListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      LevelDomainResponse,
      LevelDomainListRequest,
      LevelDomainListResponse
    >
      {...props}
      name={props.name || "levelDomainID"}
      label={props.label || tWords("levelDomain")}
      placeholder={props.placeholder || tWords("levelDomain")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("levelDomain") })
      }
      getItemList={getLevelDomainList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelLevelDomain item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: LevelDomainResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: `${item.level?.name || tWords("invalidLabel", { label: tWords("level") })} ${
          item.domain?.name ||
          tWords("invalidLabel", { label: tWords("domain") })
        } - ${item.domain?.department?.name || tWords("invalidLabel", { label: tWords("department") })}, ${
          item.domain?.department?.faculty?.name ||
          tWords("invalidLabel", { label: tWords("faculty") })
        }`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
