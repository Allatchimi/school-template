"use client";

import { RoleListRequest } from "@/lib/api/user/role/request";
import { RoleResponse, RoleListResponse } from "@/lib/api/user/role/response";
import { getRoleList } from "@/lib/api/user/role/routes";
import FormItemSelectFetch, { FormItemSelectFetchProps } from "../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectRole(
  props: FormItemSelectFetchProps<
    RoleResponse,
    RoleListRequest,
    RoleListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<RoleResponse, RoleListRequest, RoleListResponse>
      {...props}
      name={props.name || "roleID"}
      label={props.label || tWords("role")}
      placeholder={props.placeholder || tWords("role")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("role") })
      }
      getItemList={getRoleList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
    />
  );
}

const getOptionsFromData = (
  data?: RoleResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: item.name || tWords("invalidLabel", { label: tWords("role") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
