"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionSpecialty } from "@/components/description/school/highschool/description-specialty";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateClass from "@/components/form/school/highschool/form-add-update-class";
import { TableColumsClass } from "@/components/table/columns/school/highschool/columns-class";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ClassRequest,
  ClassListRequest,
  compareClassRequestToResponse,
} from "@/lib/api/school/highschool/class/request";
import {
  ClassResponse,
  ClassListResponse,
} from "@/lib/api/school/highschool/class/response";
import {
  getClassList,
  postClass,
  updateClass,
  deleteClass,
  deleteMultipleClass,
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
        ClassRequest,
        ClassResponse,
        ClassListRequest,
        ClassListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("class")}
        downloadUploadTableName="highschool_classes"
        queryKeyData="admin-classes-data"
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
        columns={TableColumsClass({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareClassRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateClass}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionClass(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("specialty"),
              description: DescriptionSpecialty(item?.specialty ?? undefined),
            },
          ];
        }}
        getItemList={getClassList}
        postItem={postClass}
        updateItem={updateClass}
        deleteItem={deleteClass}
        deleteMultipleItems={deleteMultipleClass}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
