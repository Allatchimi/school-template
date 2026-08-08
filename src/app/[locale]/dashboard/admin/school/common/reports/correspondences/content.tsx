"use client";

import { DescriptionReportCorrespondence } from "@/components/description/school/common/description-report-correspondence";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateReportCorrespondence from "@/components/form/school/common/form-add-update-report-correspondence";
import { TableColumsReportCorrespondence } from "@/components/table/columns/school/common/columns-report-correspondence";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ReportCorrespondenceRequest,
  ReportCorrespondenceListRequest,
  compareReportCorrespondenceRequestToResponse,
} from "@/lib/api/school/common/report/request";
import {
  ReportCorrespondenceResponse,
  ReportCorrespondenceListResponse,
} from "@/lib/api/school/common/report/response";
import {
  getReportCorrespondenceList,
  postReportCorrespondence,
  updateReportCorrespondence,
  deleteReportCorrespondence,
  deleteMultipleReportCorrespondence,
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
        ReportCorrespondenceRequest,
        ReportCorrespondenceResponse,
        ReportCorrespondenceListRequest,
        ReportCorrespondenceListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("reportCorrespondence")}
        downloadUploadTableName="report_correspondences"
        queryKeyData="admin-report-correspondences-data"
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
        columns={TableColumsReportCorrespondence({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareReportCorrespondenceRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateReportCorrespondence}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionReportCorrespondence(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getReportCorrespondenceList}
        postItem={postReportCorrespondence}
        updateItem={updateReportCorrespondence}
        deleteItem={deleteReportCorrespondence}
        deleteMultipleItems={deleteMultipleReportCorrespondence}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
