"use client";

import { StudentEnrollListRequest } from "@/lib/api/school/common/student/request";
import {
  StudentEnrollResponse,
  StudentListResponse,
} from "@/lib/api/school/common/student/response";
import { getStudentEnrollList } from "@/lib/api/school/common/student/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import SelectLabelStudentEnroll from "@/components/form-item/select-label/school/common/select-label-student";
import { useTranslations } from "next-intl";

export default function FormItemSelectStudentEnroll(
  props: FormItemSelectFetchProps<
    StudentEnrollResponse,
    StudentEnrollListRequest,
    StudentListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      StudentEnrollResponse,
      StudentEnrollListRequest,
      StudentListResponse
    >
      {...props}
      name={props.name || "studentEnrollID"}
      label={props.label || tWords("studentEnroll")}
      placeholder={props.placeholder || tWords("studentEnroll")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("studentEnroll") })
      }
      getItemList={getStudentEnrollList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelStudentEnroll item={option.data ?? undefined} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: StudentEnrollResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const uid =
        item.student?.uid || tWords("invalidLabel", { label: tWords("uid") });
      const fullNameSpace = `${item.student?.user?.info?.firstName || ""} ${item.student?.user?.info?.lastName || ""}`;
      const fullName =
        fullNameSpace.trim().length > 0
          ? fullNameSpace
          : tWords("invalidLabel", { label: tWords("name") });
      const year =
        item.year?.name || tWords("invalidLabel", { label: tWords("year") });
      const classLevelDomainFull =
        item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
          ? `${item?.class?.name || tWords("invalidLabel", { label: tWords("class") })} - ${
              item?.class?.specialty?.name ||
              tWords("invalidLabel", { label: tWords("specialty") })
            } (${item?.class?.specialty?.section?.name || tWords("invalidLabel", { label: tWords("section") })})`
          : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? `${item?.levelDomain?.level?.name || tWords("invalidLabel", { label: tWords("level") })} ${
                item.levelDomain?.domain?.name ||
                tWords("invalidLabel", { label: tWords("domain") })
              } - ${item?.levelDomain?.domain?.department?.name || tWords("invalidLabel", { label: tWords("department") })} (${
                item?.levelDomain?.domain?.department?.faculty?.name ||
                tWords("invalidLabel", { label: tWords("faculty") })
              })`
            : tWords("invalidLabel", { label: tWords("classLevelDomain") });

      return {
        data: item,
        label: `${uid} - ${fullName}, ${classLevelDomainFull}, ${year}`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
