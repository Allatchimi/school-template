"use client";

import SelectLabelSchool from "@/components/form-item/select-label/school/common/select-label-school";
import { SchoolListRequest } from "@/lib/api/school/common/school/request";
import {
  SchoolResponse,
  SchoolListResponse,
} from "@/lib/api/school/common/school/response";
import {
  getSchool,
  getSchoolList,
} from "@/lib/api/school/common/school/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectSchool(
  props: {
    onChangeFormatted?: (value?: SchoolResponse) => void;
  } & FormItemSelectFetchProps<
    SchoolResponse,
    SchoolListRequest,
    SchoolListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school");

  return (
    <FormItemSelectFetch<SchoolResponse, SchoolListRequest, SchoolListResponse>
      {...props}
      form={props.form}
      name={props.name || "schoolID"}
      label={props.label || tWords("school")}
      placeholder={props.placeholder || tWords("school")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("school") })
      }
      getItem={getSchool}
      getItemList={getSchoolList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords, tEnums)}
      optionsFormat={(data) => getOptionsFromData(data, tWords, tEnums)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelSchool item={option.data} />
        ) : (
          option.label
        );
      }}
      onSelect={(_, option) => {
        if (!props.onChangeFormatted) {
          return;
        }

        // Not array
        if (!Array.isArray(option)) {
          props.onChangeFormatted(option?.data);
          return;
        }

        // Array
        if (option.length > 0) {
          props.onChangeFormatted(option?.[0].data);
        }
        return;
      }}
    />
  );
}

const getOptionsFromData = (
  data?: SchoolResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>,
  tEnums?: ReturnType<typeof useTranslations>
) => {
  if (!tWords || !tEnums) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: `${
          item.name || tWords("invalidLabel", { label: tWords("school") })
        } (${item.type ? tEnums(`type.${item.type}`) : tWords("invalidLabel", { label: tWords("type") })})`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
