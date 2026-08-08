"use client";

import SelectLabelUser from "@/components/form-item/select-label/user/select-label-user";
import { DirectorListRequest } from "@/lib/api/school/common/director/request";
import {
  DirectorResponse,
  DirectorListResponse,
} from "@/lib/api/school/common/director/response";
import { getDirectorList } from "@/lib/api/school/common/director/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectDirector(
  props: FormItemSelectFetchProps<
    DirectorResponse,
    DirectorListRequest,
    DirectorListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      DirectorResponse,
      DirectorListRequest,
      DirectorListResponse
    >
      {...props}
      name={props.name || "directorID"}
      label={props.label || tWords("director")}
      placeholder={props.placeholder || tWords("director")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("director") })
      }
      getItemList={getDirectorList}
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
  data?: DirectorResponse[] | null,
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
