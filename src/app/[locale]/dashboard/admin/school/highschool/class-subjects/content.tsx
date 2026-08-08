"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionSubject } from "@/components/description/school/highschool/description-subject";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateClassSubject from "@/components/form/school/highschool/form-add-update-class-subject";
import { TableColumsClassSubject } from "@/components/table/columns/school/highschool/columns-class-subject";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ClassSubjectRequest,
  ClassSubjectListRequest,
  compareClassSubjectRequestToResponse,
} from "@/lib/api/school/highschool/class/request";
import {
  ClassSubjectResponse,
  ClassSubjectListResponse,
} from "@/lib/api/school/highschool/class/response";
import {
  getClassSubjectList,
  postClassSubject,
  updateClassSubject,
  deleteClassSubject,
  deleteMultipleClassSubject,
} from "@/lib/api/school/highschool/class/routes";
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
        ClassSubjectRequest,
        ClassSubjectResponse,
        ClassSubjectListRequest,
        ClassSubjectListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("subject")}
        downloadUploadTableName="highschool_class_subjects"
        queryKeyData="admin-class-subjects-data"
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
        columns={TableColumsClassSubject({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareClassSubjectRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateClassSubject}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionClassSubject(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("class"),
              description: DescriptionClass(item?.class ?? undefined),
            },
            {
              title: tWords("subject"),
              description: DescriptionSubject(item?.subject ?? undefined),
            },
          ];
        }}
        getItemList={getClassSubjectList}
        postItem={postClassSubject}
        updateItem={updateClassSubject}
        deleteItem={deleteClassSubject}
        deleteMultipleItems={deleteMultipleClassSubject}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
