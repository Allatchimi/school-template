"use client";

import SelectLabelDepartment from "@/components/form-item/select-label/school/university/select-department";
import { DepartmentListRequest } from "@/lib/api/school/university/department/request";
import {
  DepartmentResponse,
  DepartmentListResponse,
} from "@/lib/api/school/university/department/response";
import { getDepartmentList } from "@/lib/api/school/university/department/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectDepartment(
  props: FormItemSelectFetchProps<
    DepartmentResponse,
    DepartmentListRequest,
    DepartmentListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      DepartmentResponse,
      DepartmentListRequest,
      DepartmentListResponse
    >
      {...props}
      name={props.name || "departmentID"}
      label={props.label || tWords("department")}
      placeholder={props.placeholder || tWords("department")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("department") })
      }
      getItemList={getDepartmentList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelDepartment item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: DepartmentResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label:
          item.name || tWords("invalidLabel", { label: tWords("department") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
