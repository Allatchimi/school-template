"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionSemester } from "@/components/description/school/university/description-semester";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateSemester from "@/components/form/school/university/form-add-update-semester";
import { TableColumsSemester } from "@/components/table/columns/school/university/columns-semester";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  SemesterRequest,
  SemesterListRequest,
  compareSemesterRequestToResponse,
} from "@/lib/api/school/university/semester/request";
import {
  SemesterResponse,
  SemesterListResponse,
} from "@/lib/api/school/university/semester/response";
import {
  getSemesterList,
  postSemester,
  updateSemester,
  deleteSemester,
  deleteMultipleSemester,
} from "@/lib/api/school/university/semester/routes";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
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
        SemesterRequest,
        SemesterResponse,
        SemesterListRequest,
        SemesterListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("semester")}
        downloadUploadTableName="university_semesters"
        queryKeyData="admin-semesters-data"
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
                request={{
                  type: SCHOOL_TYPE_UNIVERSITY,
                }}
                noMargin={true}
              />
            </div>
          );
        }}
        columns={TableColumsSemester({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareSemesterRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateSemester}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionSemester(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getSemesterList}
        postItem={postSemester}
        updateItem={updateSemester}
        deleteItem={deleteSemester}
        deleteMultipleItems={deleteMultipleSemester}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
