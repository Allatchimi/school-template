"use client";

import { DescriptionStudent } from "@/components/description/school/common/description-student";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import FormAddUpdateStudent from "@/components/form/school/common/form-add-update-student";
import { TableColumsStudent } from "@/components/table/columns/school/common/columns-student";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  StudentRequest,
  StudentListRequest,
  compareStudentRequestToResponse,
} from "@/lib/api/school/common/student/request";
import {
  StudentResponse,
  StudentListResponse,
} from "@/lib/api/school/common/student/response";
import {
  getStudentList,
  postStudent,
  updateStudent,
  deleteStudent,
  deleteMultipleStudent,
} from "@/lib/api/school/common/student/routes";
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
        StudentRequest,
        StudentResponse,
        StudentListRequest,
        StudentListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("student")}
        downloadUploadTableName="students"
        queryKeyData="admin-students-data"
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
        columns={TableColumsStudent({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareStudentRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateStudent}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionStudent(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getStudentList}
        postItem={postStudent}
        updateItem={updateStudent}
        deleteItem={deleteStudent}
        deleteMultipleItems={deleteMultipleStudent}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
