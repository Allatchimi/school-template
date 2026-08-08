"use client";

import MeetingList from "@/components/card-list/school/common/meeting-list";
import { DescriptionMeeting } from "@/components/description/school/common/description-meeting";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
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
  MeetingRequest,
  MeetingListRequest,
} from "@/lib/api/school/common/meeting/request";
import {
  MeetingResponse,
  MeetingListResponse,
} from "@/lib/api/school/common/meeting/response";
import { getMeetingList } from "@/lib/api/school/common/meeting/routes";
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
      value: "api_room_id",
      label: tWords("apiRoomID"),
    },
    {
      value: "is_running",
      label: tWords("isRunning"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        MeetingRequest,
        MeetingResponse,
        MeetingListRequest,
        MeetingListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("meeting")}
        queryKeyData="teacher-meetings-data"
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
            { description: DescriptionMeeting(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
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
        returnItemListNode={MeetingList}
        getItemList={getMeetingList}
      />
    </>
  );
}
