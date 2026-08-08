"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionDepartment } from "@/components/description/school/university/description-department";
import { DescriptionFaculty } from "@/components/description/school/university/description-faculty";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateDepartment from "@/components/form/school/university/form-add-update-department";
import { TableColumsDepartment } from "@/components/table/columns/school/university/columns-department";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  DepartmentRequest,
  DepartmentListRequest,
  compareDepartmentRequestToResponse,
} from "@/lib/api/school/university/department/request";
import {
  DepartmentResponse,
  DepartmentListResponse,
} from "@/lib/api/school/university/department/response";
import {
  getDepartmentList,
  postDepartment,
  updateDepartment,
  deleteDepartment,
  deleteMultipleDepartment,
} from "@/lib/api/school/university/department/routes";
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
        DepartmentRequest,
        DepartmentResponse,
        DepartmentListRequest,
        DepartmentListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("department")}
        downloadUploadTableName="university_departments"
        queryKeyData="admin-departments-data"
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
        columns={TableColumsDepartment({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareDepartmentRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateDepartment}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionDepartment(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("faculty"),
              description: DescriptionFaculty(item?.faculty ?? undefined),
            },
          ];
        }}
        getItemList={getDepartmentList}
        postItem={postDepartment}
        updateItem={updateDepartment}
        deleteItem={deleteDepartment}
        deleteMultipleItems={deleteMultipleDepartment}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
