"use client";

import { DescriptionTeacher } from "@/components/description/school/common/description-teacher";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import FormAddUpdateTeacher from "@/components/form/school/common/form-add-update-teacher";
import { TableColumsTeacher } from "@/components/table/columns/school/common/columns-teacher";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  TeacherRequest,
  TeacherListRequest,
  compareTeacherRequestToResponse,
} from "@/lib/api/school/common/teacher/request";
import {
  TeacherResponse,
  TeacherListResponse,
} from "@/lib/api/school/common/teacher/response";
import {
  getTeacherList,
  postTeacher,
  updateTeacher,
  deleteTeacher,
  deleteMultipleTeacher,
} from "@/lib/api/school/common/teacher/routes";
import { useSearchParams } from "next/navigation";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import { useTranslations } from "next-intl";

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
        TeacherRequest,
        TeacherResponse,
        TeacherListRequest,
        TeacherListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("teacher")}
        downloadUploadTableName="teachers"
        queryKeyData="admin-teachers-data"
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
        columns={TableColumsTeacher({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareTeacherRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateTeacher}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionTeacher(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getTeacherList}
        postItem={postTeacher}
        updateItem={updateTeacher}
        deleteItem={deleteTeacher}
        deleteMultipleItems={deleteMultipleTeacher}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
