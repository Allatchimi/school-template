"use client";

import SelectLabelUnit from "@/components/form-item/select-label/school/university/select-label-unit";
import { UnitListRequest } from "@/lib/api/school/university/unit/request";
import {
  UnitResponse,
  UnitListResponse,
} from "@/lib/api/school/university/unit/response";
import { getUnitList } from "@/lib/api/school/university/unit/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectUnit(
  props: FormItemSelectFetchProps<
    UnitResponse,
    UnitListRequest,
    UnitListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<UnitResponse, UnitListRequest, UnitListResponse>
      {...props}
      name={props.name || "unitID"}
      label={props.label || tWords("unit")}
      placeholder={props.placeholder || tWords("unit")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("unit") })
      }
      getItemList={getUnitList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelUnit item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: UnitResponse[] | null,
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
          item.name || tWords("invalidLabel", { label: tWords("unit") })
        }, ${item.levelDomain?.level?.name || tWords("invalidLabel", { label: tWords("name") })} ${
          item.levelDomain?.domain?.name ||
          tWords("invalidLabel", { label: tWords("domain") })
        } - ${
          item.levelDomain?.domain?.department?.name ||
          tWords("invalidLabel", { label: tWords("department") })
        }, ${
          item.levelDomain?.domain?.department?.faculty?.name ||
          tWords("invalidLabel", { label: tWords("faculty") })
        }`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
