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
  FilterSchoolYearType,
  filterSchoolYearTypeTemplate,
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
        FilterSchoolYearType
      >
        itemLabel={tWords("schedule")}
        downloadUploadTableName="schedules_weekly_view"
        queryKeyData="student-schedules-data"
        canDownload={true}
        searchParams={searchParams}
        filterTemplate={filterSchoolYearTypeTemplate}
        columns={TableColumsScheduleWeeklyView({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
        })}
        getItemList={getScheduleWeeklyView}
      />
    </div>
  );
}
