"use client";

import { TableColumsScheduleWeeklyView } from "@/components/table/columns/school/common/columns-schedule";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import {
  ScheduleRequest,
  ScheduleListRequest,
} from "@/lib/api/school/common/schedule/request";
import {
  ScheduleResponse,
  ScheduleListResponse,
} from "@/lib/api/school/common/schedule/response";
import { getScheduleWeeklyView } from "@/lib/api/school/common/schedule/routes";
import { useSearchParams } from "next/navigation";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import { SchoolConfig } from "@/config/school";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";

import "../../../../../../../styles/table.css";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  // React hooks
  const searchParams = useSearchParams();

  return (
    <div className="equal-width-table">
      <ContentTableTemplate<
        ScheduleRequest,
        ScheduleResponse,
        ScheduleListRequest,
        ScheduleListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("schedule")}
        downloadUploadTableName="schedules_weekly_view"
        queryKeyData="teacher-schedules-data"
        canDownload={true}
        searchParams={searchParams}
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
        columns={TableColumsScheduleWeeklyView({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
        })}
        getItemList={getScheduleWeeklyView}
      />
    </div>
  );
}
