"use client";

import { DescriptionReportTable } from "@/components/description/school/common/description-report-table";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormFilterSchoolLevelDomain from "@/components/form/filter/form-filter-school-level-domain";
import { TableColumsReportTable } from "@/components/table/columns/school/common/columns-report-table";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import { setMultipleSearchParamFromObject } from "@/helpers/url/search-param";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { ReportTableListRequest } from "@/lib/api/school/common/report/request";
import {
  ReportTableResponse,
  ReportTableListResponse,
} from "@/lib/api/school/common/report/response";
import { getReportTableList } from "@/lib/api/school/common/report/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

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
        ReportTableResponse,
        ReportTableListRequest,
        ReportTableListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("reportTable")}
        downloadUploadTableName="report_tables"
        queryKeyData="admin-report-tables-data"
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
        columns={TableColumsReportTable({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={undefined}
        returnFormAddUpdateNode={undefined}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionReportTable(item) },
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
                    title: tWords("class"),
                    description: DescriptionClass(item?.class ?? undefined),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("levelDomain"),
                      description: DescriptionLevelDomain(
                        item?.levelDomain ?? undefined
                      ),
                    },
                  ]
                : [
                    {
                      title: tWords("classLevelDomain"),
                      description: undefined,
                    },
                  ]),
          ];
        }}
        getItemList={getReportTableList}
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
