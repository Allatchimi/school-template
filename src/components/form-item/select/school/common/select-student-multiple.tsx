"use client";

import SelectLabelUser from "@/components/form-item/select-label/user/select-label-user";
import { StudentListRequest } from "@/lib/api/school/common/student/request";
import {
  StudentResponse,
  StudentListResponse,
} from "@/lib/api/school/common/student/response";
import { getStudentList } from "@/lib/api/school/common/student/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectStudent(
  props: FormItemSelectFetchProps<
    StudentResponse,
    StudentListRequest,
    StudentListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      StudentResponse,
      StudentListRequest,
      StudentListResponse
    >
      {...props}
      name={props.name || "studentIDs"}
      label={props.label || tWords("student")}
      placeholder={props.placeholder || tWords("student")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("student") })
      }
      getItemList={getStudentList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelUser
            item={option.data?.user ?? undefined}
            moreDetails={option.data.uid ?? undefined}
          />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (data?: StudentResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const uid = item.uid || tWords("invalidLabel", { label: tWords("uid") });
      const fullNameSpace = `${item.user?.info?.firstName || ""} ${item.user?.info?.lastName || ""}`;
      const fullName =
        fullNameSpace.trim().length > 0
          ? fullNameSpace
          : tWords("invalidLabel", { label: tWords("name") });
      return {
        data: item,
        label: `${uid} - ${fullName}`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
