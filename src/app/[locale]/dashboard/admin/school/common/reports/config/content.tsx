"use client";

import { DescriptionReportConfig } from "@/components/description/school/common/description-report-config";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateReportConfig from "@/components/form/school/common/form-add-update-report-config";
import { TableColumsReportConfig } from "@/components/table/columns/school/common/columns-report-config";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ReportConfigRequest,
  ReportConfigListRequest,
  compareReportConfigRequestToResponse,
} from "@/lib/api/school/common/report/request";
import {
  ReportConfigResponse,
  ReportConfigListResponse,
} from "@/lib/api/school/common/report/response";
import {
  getReportConfigList,
  postReportConfig,
  deleteReportConfig,
  deleteMultipleReportConfig,
  updateReportConfig,
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
        ReportConfigRequest,
        ReportConfigResponse,
        ReportConfigListRequest,
        ReportConfigListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("reportConfig")}
        downloadUploadTableName="report configs"
        queryKeyData="admin-report-configs-data"
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
        columns={TableColumsReportConfig({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareReportConfigRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateReportConfig}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionReportConfig(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getReportConfigList}
        postItem={postReportConfig}
        updateItem={updateReportConfig}
        deleteItem={deleteReportConfig}
        deleteMultipleItems={deleteMultipleReportConfig}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
