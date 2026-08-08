"use client";

import CourseList from "@/components/card-list/school/common/course-list";
import { DescriptionCourse } from "@/components/description/school/common/description-course";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearStudentType,
  filterSchoolYearStudentTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student-multiple";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
import {
  CourseRequest,
  CourseListRequest,
} from "@/lib/api/school/common/course/request";
import {
  CourseResponse,
  CourseListResponse,
} from "@/lib/api/school/common/course/response";
import { getCourseList } from "@/lib/api/school/common/course/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  const orderByList = [
    {
      value: "",
      label: tWords("default"),
    },
    {
      value: "title",
      label: tWords("title"),
    },
  ];
  return (
    <>
      <ContentCardListTemplate<
        CourseRequest,
        CourseResponse,
        CourseListRequest,
        CourseListResponse,
        FilterSchoolYearStudentType
      >
        itemLabel={tWords("course")}
        queryKeyData="student-courses-data"
        dialogDescriptionWidth={800}
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolYearStudentTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              <FormItemSelectStudent
                disabled={loading}
                defaultValue={values?.studentID?.toString()}
                request={{
                  schoolID: SchoolConfig?.schoolID(),
                }}
                allowEmptySelection={true}
                allowEmptySelectionLabel="*"
                noMargin={true}
              />
            </div>
          );
        }}
        returnDescriptionsNode={(item) => {
          return [
            { description: DescriptionCourse(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("year"),
              description: DescriptionYear(item?.year ?? undefined),
            },
            ...(item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
              ? [
                  {
                    title: tWords("subject"),
                    description: DescriptionClassSubject(
                      item?.classSubject ?? undefined
                    ),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("unit"),
                      description: DescriptionUnit(item?.unit ?? undefined),
                    },
                  ]
                : [
                    {
                      title: tWords("subjectUnit"),
                      description: undefined,
                    },
                  ]),
          ];
        }}
        returnItemListNode={CourseList}
        getItemList={getCourseList}
      />
    </>
  );
}
