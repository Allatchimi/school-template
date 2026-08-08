"use client";

import SelectLabelExam from "@/components/form-item/select-label/school/common/select-label-exam";
import { ExamListRequest } from "@/lib/api/school/common/exam/request";
import {
  ExamResponse,
  ExamListResponse,
} from "@/lib/api/school/common/exam/response";
import { getExamList } from "@/lib/api/school/common/exam/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectExam(
  props: FormItemSelectFetchProps<
    ExamResponse,
    ExamListRequest,
    ExamListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<ExamResponse, ExamListRequest, ExamListResponse>
      {...props}
      name={props.name || "examID"}
      label={props.label || tWords("exam")}
      placeholder={props.placeholder || tWords("exam")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("exam") })
      }
      getItemList={getExamList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelExam item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: ExamResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const examType =
        item.type?.name || tWords("invalidLabel", { label: tWords("type") });
      const classSubjectUnit =
        item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
          ? `${item.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
              item.classSubject?.class?.name ||
              tWords("invalidLabel", { label: tWords("class") })
            }`
          : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? `${item.unit?.name || tWords("invalidLabel", { label: tWords("unit") })}`
            : tWords("invalidLabel", { label: tWords("subjectUnit") });
      const sequenceSemester =
        item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
          ? item?.sequence?.name ||
            tWords("invalidLabel", { label: tWords("sequence") })
          : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? item.unit?.semester?.name ||
              tWords("invalidLabel", { label: tWords("semester") })
            : tWords("invalidLabel", { label: tWords("sequenceSemester") });
      const year =
        item.year?.name || tWords("invalidLabel", { label: tWords("year") });
      return {
        data: item,
        label: `${examType} - ${classSubjectUnit} (${sequenceSemester} ${year})`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
