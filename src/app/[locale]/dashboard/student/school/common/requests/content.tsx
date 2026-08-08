"use client";

import RequestList from "@/components/card-list/school/common/request-list";
import { DescriptionRequest } from "@/components/description/school/common/description-request";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionStudent } from "@/components/description/school/common/description-student";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionSequence } from "@/components/description/school/highschool/description-sequence";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearClassSubjectUnitType,
  filterSchoolYearClassSubjectUnitTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormAddUpdateRequest from "@/components/form/school/common/form-add-update-request";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
import {
  RequestRequest,
  RequestListRequest,
  compareRequestRequestToResponse,
} from "@/lib/api/school/common/request/request";
import {
  RequestResponse,
  RequestListResponse,
} from "@/lib/api/school/common/request/response";
import {
  deleteRequest,
  getRequestList,
  postRequest,
  updateRequest,
} from "@/lib/api/school/common/request/routes";
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
      value: "audience",
      label: tWords("audience"),
    },
    {
      value: "title",
      label: tWords("title"),
    },
    {
      value: "status",
      label: tWords("status"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        RequestRequest,
        RequestResponse,
        RequestListRequest,
        RequestListResponse,
        FilterSchoolYearClassSubjectUnitType
      >
        itemLabel={tWords("request")}
        queryKeyData="student-requests-data"
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
            { description: DescriptionRequest(item) },
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
            {
              title: tWords("student"),
              description: DescriptionStudent(item?.student ?? undefined),
            },
          ];
        }}
        dialogDescriptionWidth={800}
        dialogFormAddUpdateWidth={800}
        areEqual={compareRequestRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateRequest}
        postItem={postRequest}
        updateItem={updateRequest}
        deleteItem={deleteRequest}
        returnItemListNode={RequestList}
        getItemList={getRequestList}
      />
    </>
  );
}
