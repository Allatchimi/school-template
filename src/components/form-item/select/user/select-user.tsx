"use client";

import { UserListRequest } from "@/lib/api/user/user/request";
import { UserResponse, UserListResponse } from "@/lib/api/user/user/response";
import { getUserList } from "@/lib/api/user/user/routes";
import SelectLabelUser from "../../select-label/user/select-label-user";
import FormItemSelectFetch, { FormItemSelectFetchProps } from "../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectUser(
  props: FormItemSelectFetchProps<
    UserResponse,
    UserListRequest,
    UserListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<UserResponse, UserListRequest, UserListResponse>
      {...props}
      name={props.name || "userID"}
      label={props.label || tWords("user")}
      placeholder={props.placeholder || tWords("user")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("user") })
      }
      getItemList={getUserList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelUser
            item={option.data}
            moreDetails={
              (option?.data?.email?.length ?? 0) > 0
                ? `${option?.data?.email}`
                : undefined
            }
          />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: UserResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const fullNameSpace = `${item?.info?.firstName || ""} ${item?.info?.lastName || ""}`;
      const fullName =
        fullNameSpace.trim().length > 0
          ? fullNameSpace
          : tWords("invalidLabel", { label: tWords("name") });
      return {
        data: item,
        label: fullName,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
