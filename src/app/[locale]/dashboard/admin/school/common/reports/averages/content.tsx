"use client";

import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormFilterSchoolLevelDomain from "@/components/form/filter/form-filter-school-level-domain";
import { TableColumsReportAverage } from "@/components/table/columns/school/common/columns-report-average";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import { setMultipleSearchParamFromObject } from "@/helpers/url/search-param";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { ReportAverageListRequest } from "@/lib/api/school/common/report/request";
import {
  ReportAverageResponse,
  ReportAverageListResponse,
} from "@/lib/api/school/common/report/response";
import { getReportAverageList } from "@/lib/api/school/common/report/routes";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  // React hooks
  const router = useCustomRouter();
  const [url, setUrl] = useState("");
  const searchParams = useSearchParams();
  const paramOrderBy = searchParams.get("orderBy");
  const paramSort = searchParams.get("sort");

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
    <>
      <ContentTableTemplate<
        object,
        ReportAverageResponse,
        ReportAverageListRequest,
        ReportAverageListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("reportAverage")}
        downloadUploadTableName="report_averages"
        queryKeyData="admin-report-averages-data"
        canAdd={false}
        canUpdate={false}
        canDeleteOne={false}
        canDeleteMultiple={false}
        canSelectMultiple={true}
        canUpload={false}
        canDownload={true}
        addDefaultActions={true}
        dialogFormAddUpdateWidth={600}
        dialogDescriptionWidth={800}
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
        columns={TableColumsReportAverage({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={undefined}
        returnFormAddUpdateNode={undefined}
        returnDescriptions={() => {
          return [];
        }}
        getItemList={getReportAverageList}
        postItem={undefined}
        updateItem={undefined}
        deleteItem={undefined}
        deleteMultipleItems={undefined}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
