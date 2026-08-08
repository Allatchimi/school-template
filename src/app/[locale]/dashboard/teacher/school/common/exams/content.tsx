"use client";

import ExamList from "@/components/card-list/school/common/exam-list";
import { DescriptionExam } from "@/components/description/school/common/description-exam";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionSequence } from "@/components/description/school/highschool/description-sequence";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
import {
  ExamRequest,
  ExamListRequest,
  compareExamRequestToResponse,
} from "@/lib/api/school/common/exam/request";
import {
  ExamResponse,
  ExamListResponse,
} from "@/lib/api/school/common/exam/response";
import { getExamList } from "@/lib/api/school/common/exam/routes";
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
      value: "notation",
      label: tWords("notation"),
    },
    {
      value: "description",
      label: tWords("description"),
    },
    {
      value: "location_type",
      label: tWords("locationType"),
    },
    {
      value: "start_date",
      label: tWords("startDate"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        ExamRequest,
        ExamResponse,
        ExamListRequest,
        ExamListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("exam")}
        queryKeyData="teacher-exams-data"
        canAdd={false}
        canUpdate={false}
        canDelete={false}
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolYearClassLevelDomainTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL ? (
                <FormItemSelectClass
                  disabled={loading}
                  defaultValue={values?.classID?.toString()}
                  request={{
                    schoolID: SchoolConfig?.schoolID(),
                  }}
                  allowEmptySelection={true}
                  allowEmptySelectionLabel="*"
                  noMargin={true}
                />
              ) : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY ? (
                <FormItemSelectLevelDomain
                  disabled={loading}
                  defaultValue={values?.levelDomainID?.toString()}
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
            { description: DescriptionExam(item) },
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
                  {
                    title: tWords("sequence"),
                    description: DescriptionSequence(
                      item?.sequence ?? undefined
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
        areEqual={compareExamRequestToResponse}
        returnFormAddUpdateNode={undefined}
        returnItemListNode={ExamList}
        postItem={undefined}
        updateItem={undefined}
        deleteItem={undefined}
        getItemList={getExamList}
      />
    </>
  );
}
