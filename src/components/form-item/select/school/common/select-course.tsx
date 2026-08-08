"use client";

import SelectLabelCourse from "@/components/form-item/select-label/school/common/select-label-course";
import { CourseListRequest } from "@/lib/api/school/common/course/request";
import {
  CourseResponse,
  CourseListResponse,
} from "@/lib/api/school/common/course/response";
import { getCourseList } from "@/lib/api/school/common/course/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectCourse(
  props: FormItemSelectFetchProps<
    CourseResponse,
    CourseListRequest,
    CourseListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<CourseResponse, CourseListRequest, CourseListResponse>
      {...props}
      name={props.name || "courseID"}
      label={props.label || tWords("course")}
      placeholder={props.placeholder || tWords("course")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("course") })
      }
      getItemList={getCourseList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelCourse item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: CourseResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const year =
        item.year?.name || tWords("invalidLabel", { label: tWords("year") });
      const classSubjectUnit =
        item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
          ? `${item.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
              item.classSubject?.class?.name ||
              tWords("invalidLabel", { label: tWords("class") })
            }`
          : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? `${item.unit?.name || tWords("invalidLabel", { label: tWords("unit") })}`
            : tWords("invalidLabel", { label: tWords("subjectUnit") });
      return {
        data: item,
        label: `${classSubjectUnit} (${year}) - ${item.title || tWords("invalidLabel", { label: tWords("title") })}`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
