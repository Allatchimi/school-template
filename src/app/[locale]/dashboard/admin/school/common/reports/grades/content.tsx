"use client";

import { DescriptionReportGrade } from "@/components/description/school/common/description-report-grade";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateReportGrade from "@/components/form/school/common/form-add-update-report-grade";
import { TableColumsReportGrade } from "@/components/table/columns/school/common/columns-report-grade";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ReportGradeRequest,
  ReportGradeListRequest,
  compareReportGradeRequestToResponse,
} from "@/lib/api/school/common/report/request";
import {
  ReportGradeResponse,
  ReportGradeListResponse,
} from "@/lib/api/school/common/report/response";
import {
  getReportGradeList,
  postReportGrade,
  deleteReportGrade,
  deleteMultipleReportGrade,
  updateReportGrade,
} from "@/lib/api/school/common/report/routes";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

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
        ReportGradeRequest,
        ReportGradeResponse,
        ReportGradeListRequest,
        ReportGradeListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("reportGrade")}
        downloadUploadTableName="report_grades"
        queryKeyData="admin-report-grades-data"
        canAdd={true}
        canUpdate={true}
        canDeleteOne={true}
        canDeleteMultiple={true}
        canSelectMultiple={true}
        canUpload={false}
        canDownload={false}
        addDefaultActions={true}
        dialogFormAddUpdateWidth={600}
        dialogDescriptionWidth={800}
        searchParams={searchParams}
        filterTemplate={filterSchoolTypeTemplate}
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
        columns={TableColumsReportGrade({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareReportGradeRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateReportGrade}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionReportGrade(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getReportGradeList}
        postItem={postReportGrade}
        updateItem={updateReportGrade}
        deleteItem={deleteReportGrade}
        deleteMultipleItems={deleteMultipleReportGrade}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
