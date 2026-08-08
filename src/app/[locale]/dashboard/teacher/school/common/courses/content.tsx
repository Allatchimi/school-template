"use client";

import CourseList from "@/components/card-list/school/common/course-list";
import { DescriptionCourse } from "@/components/description/school/common/description-course";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearClassSubjectUnitType,
  filterSchoolYearClassSubjectUnitTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormAddUpdateCourse from "@/components/form/school/common/form-add-update-course";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
import {
  CourseRequest,
  CourseListRequest,
  compareCourseRequestToResponse,
} from "@/lib/api/school/common/course/request";
import {
  CourseResponse,
  CourseListResponse,
} from "@/lib/api/school/common/course/response";
import {
  postCourse,
  updateCourse,
  deleteCourse,
  getCourseList,
} from "@/lib/api/school/common/course/routes";
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
        FilterSchoolYearClassSubjectUnitType
      >
        itemLabel={tWords("course")}
        queryKeyData="teacher-courses-data"
        canAdd={true}
        canUpdate={true}
        canDelete={true}
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolYearClassSubjectUnitTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL ? (
                <FormItemSelectClassSubject
                  disabled={loading}
                  defaultValue={values?.classSubjectID?.toString()}
                  request={{
                    schoolID: SchoolConfig?.schoolID(),
                  }}
                  allowEmptySelection={true}
                  allowEmptySelectionLabel="*"
                  noMargin={true}
                />
              ) : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY ? (
                <FormItemSelectUnit
                  disabled={loading}
                  defaultValue={values?.unitID?.toString()}
                  request={{
                    schoolID: SchoolConfig?.schoolID(),
                  }}
                  allowEmptySelection={true}
                  allowEmptySelectionLabel="*"
                  noMargin={true}
                />
              ) : undefined}
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
        dialogDescriptionWidth={800}
        dialogFormAddUpdateWidth={800}
        areEqual={compareCourseRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateCourse}
        returnItemListNode={CourseList}
        postItem={postCourse}
        updateItem={updateCourse}
        deleteItem={deleteCourse}
        getItemList={getCourseList}
      />
    </>
  );
}
