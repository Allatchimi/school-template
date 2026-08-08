"use client";

import SelectLabelLevel from "@/components/form-item/select-label/school/university/select-label-level";
import { LevelListRequest } from "@/lib/api/school/university/level/request";
import {
  LevelResponse,
  LevelListResponse,
} from "@/lib/api/school/university/level/response";
import { getLevelList } from "@/lib/api/school/university/level/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectLevel(
  props: FormItemSelectFetchProps<
    LevelResponse,
    LevelListRequest,
    LevelListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<LevelResponse, LevelListRequest, LevelListResponse>
      {...props}
      name={props.name || "levelID"}
      label={props.label || tWords("level")}
      placeholder={props.placeholder || tWords("level")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("level") })
      }
      getItemList={getLevelList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelLevel item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: LevelResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: item.name || tWords("invalidLabel", { label: tWords("level") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
