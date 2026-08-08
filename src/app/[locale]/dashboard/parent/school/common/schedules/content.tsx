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
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student-multiple";
import {
  FilterSchoolYearStudentType,
  filterSchoolYearStudentTypeTemplate,
} from "@/components/filter/default-filters";
import { SchoolConfig } from "@/config/school";
import { useTranslations } from "next-intl";

import "../../../../../../../styles/table.css";

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
        FilterSchoolYearStudentType
      >
        itemLabel={tWords("schedule")}
        downloadUploadTableName="schedules_weekly_view"
        queryKeyData="parent-schedules-data"
        canDownload={true}
        searchParams={searchParams}
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
        columns={TableColumsScheduleWeeklyView({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
        })}
        getItemList={getScheduleWeeklyView}
      />
    </div>
  );
}
