"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionSchedule } from "@/components/description/school/common/description-schedule";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateSchedule from "@/components/form/school/common/form-add-update-schedule";
import { TableColumsSchedule } from "@/components/table/columns/school/common/columns-schedule";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ScheduleRequest,
  ScheduleListRequest,
  compareScheduleRequestToResponse,
} from "@/lib/api/school/common/schedule/request";
import {
  ScheduleResponse,
  ScheduleListResponse,
} from "@/lib/api/school/common/schedule/response";
import {
  getScheduleList,
  postSchedule,
  updateSchedule,
  deleteSchedule,
  deleteMultipleSchedule,
} from "@/lib/api/school/common/schedule/routes";
import { useSearchParams } from "next/navigation";
import { SchoolConfig } from "@/config/school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  // React hooks
  const searchParams = useSearchParams();
  const paramOrderBy = searchParams.get("orderBy");
  const paramSort = searchParams.get("sort");

  return (
    <>
      <ContentTableTemplate<
        ScheduleRequest,
        ScheduleResponse,
        ScheduleListRequest,
        ScheduleListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("schedule")}
        downloadUploadTableName="schedules"
        queryKeyData="admin-schedules-data"
        canAdd={true}
        canUpdate={true}
        canDeleteOne={true}
        canDeleteMultiple={true}
        canSelectMultiple={true}
        canUpload={false}
        canDownload={false}
        addDefaultActions={true}
        dialogFormAddUpdateWidth={800}
        dialogDescriptionWidth={800}
        searchParams={searchParams}
        filterTemplate={filterSchoolYearClassLevelDomainTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          if ((SchoolConfig.schoolID() ?? 0) > 0) {
            return undefined;
          }
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              <FormItemSelectSchool
                disabled={loading}
                defaultValue={values?.schoolID?.toString()}
                allowEmptySelection={true}
                allowEmptySelectionLabel="*"
                noMargin={true}
              />
            </div>
          );
        }}
        columns={TableColumsSchedule({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareScheduleRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateSchedule}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionSchedule(item) },
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
                    title: tWords("class"),
                    description: DescriptionClass(
                      item?.classSubject?.class ?? undefined
                    ),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("unit"),
                      description: DescriptionUnit(item?.unit ?? undefined),
                    },
                    {
                      title: tWords("levelDomain"),
                      description: DescriptionLevelDomain(
                        item?.unit?.levelDomain ?? undefined
                      ),
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
        getItemList={getScheduleList}
        postItem={postSchedule}
        updateItem={updateSchedule}
        deleteItem={deleteSchedule}
        deleteMultipleItems={deleteMultipleSchedule}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
