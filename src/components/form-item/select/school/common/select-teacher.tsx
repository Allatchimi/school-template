"use client";

import SelectLabelUser from "@/components/form-item/select-label/user/select-label-user";
import { TeacherListRequest } from "@/lib/api/school/common/teacher/request";
import {
  TeacherResponse,
  TeacherListResponse,
} from "@/lib/api/school/common/teacher/response";
import { getTeacherList } from "@/lib/api/school/common/teacher/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectTeacher(
  props: FormItemSelectFetchProps<
    TeacherResponse,
    TeacherListRequest,
    TeacherListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      TeacherResponse,
      TeacherListRequest,
      TeacherListResponse
    >
      {...props}
      name={props.name || "teacherID"}
      label={props.label || tWords("teacher")}
      placeholder={props.placeholder || tWords("teacher")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("teacher") })
      }
      getItemList={getTeacherList}
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

const getOptionsFromData = (
  data?: TeacherResponse[] | null,
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
