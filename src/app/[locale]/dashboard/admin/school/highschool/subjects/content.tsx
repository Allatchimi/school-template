"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionSubject } from "@/components/description/school/highschool/description-subject";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateSubject from "@/components/form/school/highschool/form-add-update-subject";
import { TableColumsSubject } from "@/components/table/columns/school/highschool/columns-subject";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  SubjectRequest,
  SubjectListRequest,
  compareSubjectRequestToResponse,
} from "@/lib/api/school/highschool/subject/request";
import {
  SubjectResponse,
  SubjectListResponse,
} from "@/lib/api/school/highschool/subject/response";
import {
  getSubjectList,
  postSubject,
  updateSubject,
  deleteSubject,
  deleteMultipleSubject,
} from "@/lib/api/school/highschool/subject/routes";
import { SCHOOL_TYPE_HIGHSCHOOL } from "@/lib/constants/school/common/school";
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
        SubjectRequest,
        SubjectResponse,
        SubjectListRequest,
        SubjectListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("subject")}
        downloadUploadTableName="highschool_subjects"
        queryKeyData="admin-subjects-data"
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
                  type: SCHOOL_TYPE_HIGHSCHOOL,
                }}
                noMargin={true}
              />
            </div>
          );
        }}
        columns={TableColumsSubject({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareSubjectRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateSubject}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionSubject(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getSubjectList}
        postItem={postSubject}
        updateItem={updateSubject}
        deleteItem={deleteSubject}
        deleteMultipleItems={deleteMultipleSubject}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
