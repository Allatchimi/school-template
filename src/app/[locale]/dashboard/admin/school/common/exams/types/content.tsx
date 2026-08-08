"use client";

import { DescriptionExamType } from "@/components/description/school/common/description-exam-type";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateExamType from "@/components/form/school/common/form-add-update-exam-type";
import { TableColumsExamType } from "@/components/table/columns/school/common/columns-exam-type";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ExamTypeRequest,
  ExamTypeListRequest,
  compareExamTypeRequestToResponse,
} from "@/lib/api/school/common/exam/request";
import {
  ExamTypeResponse,
  ExamTypeListResponse,
} from "@/lib/api/school/common/exam/response";
import {
  getExamTypeList,
  deleteMultipleExamType,
  postExamType,
  updateExamType,
  deleteExamType,
} from "@/lib/api/school/common/exam/routes";
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
        ExamTypeRequest,
        ExamTypeResponse,
        ExamTypeListRequest,
        ExamTypeListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("examType")}
        downloadUploadTableName="exam-types"
        queryKeyData="admin-exam-types-data"
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
        columns={TableColumsExamType({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareExamTypeRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateExamType}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionExamType(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getExamTypeList}
        postItem={postExamType}
        updateItem={updateExamType}
        deleteItem={deleteExamType}
        deleteMultipleItems={deleteMultipleExamType}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
