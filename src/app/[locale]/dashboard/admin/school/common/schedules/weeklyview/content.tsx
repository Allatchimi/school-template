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
import FormFilterSchoolLevelDomain from "@/components/form/filter/form-filter-school-level-domain";
import { SchoolConfig } from "@/config/school";
import { useCallback, useEffect, useState } from "react";
import { setMultipleSearchParamFromObject } from "@/helpers/url/search-param";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { useTranslations } from "next-intl";

import "../../../../../../../../styles/table.css";

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  // React hooks
  const router = useCustomRouter();
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");

  const updateWindowData = useCallback(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [setUrl]);

  useEffect(() => {
    updateWindowData();
  }, [updateWindowData]);

  const handleChangedValues = (
    value?: FilterSchoolYearClassLevelDomainType
  ) => {
    const newValue = {
      ...value,
      classID: undefined,
      levelDomainID: undefined,
    };
    const newUrl = setMultipleSearchParamFromObject(url, newValue);
    router.push(newUrl.href);
  };

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
        queryKeyData="student-schedules-data"
        downloadUploadTableName="schedules_weekly_view"
        canDownload={true}
        hideTableHeader={true}
        hidePagination={true}
        searchParams={searchParams}
        filterTemplate={filterSchoolYearClassLevelDomainTypeTemplate}
        returnExtraFilterNode={(values, loading, form) => {
          return (
            <FormFilterSchoolLevelDomain
              disabled={loading === true}
              item={values}
              form={form}
              onFieldsChanged={handleChangedValues}
            />
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
