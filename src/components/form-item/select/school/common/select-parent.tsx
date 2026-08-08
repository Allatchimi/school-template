"use client";

import SelectLabelUser from "@/components/form-item/select-label/user/select-label-user";
import { ParentListRequest } from "@/lib/api/school/common/parent/request";
import {
  ParentResponse,
  ParentListResponse,
} from "@/lib/api/school/common/parent/response";
import { getParentList } from "@/lib/api/school/common/parent/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectParent(
  props: FormItemSelectFetchProps<
    ParentResponse,
    ParentListRequest,
    ParentListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<ParentResponse, ParentListRequest, ParentListResponse>
      {...props}
      name={props.name || "parentID"}
      label={props.label || tWords("parent")}
      placeholder={props.placeholder || tWords("parent")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("parent") })
      }
      getItemList={getParentList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelUser item={option.data?.user ?? undefined} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: ParentResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const fullNameSpace = `${item.user?.info?.firstName || ""} ${item.user?.info?.lastName || ""}`;
      const fullName =
        fullNameSpace.trim().length > 0
          ? fullNameSpace
          : tWords("invalidLabel", { label: tWords("name") });
      return {
        data: item,
        label: `${fullName}`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
