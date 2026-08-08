"use client";

import { DescriptionParent } from "@/components/description/school/common/description-parent";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionStudent } from "@/components/description/school/common/description-student";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateParentStudent from "@/components/form/school/common/form-add-update-parent-student";
import { TableColumsParentStudent } from "@/components/table/columns/school/common/columns-parent-student";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ParentStudentRequest,
  ParentStudentListRequest,
  compareParentStudentRequestToResponse,
} from "@/lib/api/school/common/parent/request";
import {
  ParentStudentResponse,
  ParentStudentListResponse,
} from "@/lib/api/school/common/parent/response";
import {
  getParentStudentList,
  postParentStudent,
  updateParentStudent,
  deleteParentStudent,
  deleteMultipleParentStudent,
} from "@/lib/api/school/common/parent/routes";
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
        ParentStudentRequest,
        ParentStudentResponse,
        ParentStudentListRequest,
        ParentStudentListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("parentStudent")}
        downloadUploadTableName="parent_students"
        queryKeyData="admin-parent-students-data"
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
        filterTemplate={filterSchoolYearClassLevelDomainTypeTemplate}
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
        columns={TableColumsParentStudent({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareParentStudentRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateParentStudent}
        returnDescriptions={(item) => {
          return [
            {
              title: tWords("parent"),
              description: DescriptionParent(item?.parent ?? undefined),
            },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("student"),
              description: DescriptionStudent(item?.student ?? undefined),
            },
          ];
        }}
        getItemList={getParentStudentList}
        postItem={postParentStudent}
        updateItem={updateParentStudent}
        deleteItem={deleteParentStudent}
        deleteMultipleItems={deleteMultipleParentStudent}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
