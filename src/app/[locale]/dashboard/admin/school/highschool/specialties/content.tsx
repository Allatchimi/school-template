"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionSection } from "@/components/description/school/highschool/description-section";
import { DescriptionSpecialty } from "@/components/description/school/highschool/description-specialty";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateSpecialty from "@/components/form/school/highschool/form-add-update-specialty";
import { TableColumsSpecialty } from "@/components/table/columns/school/highschool/columns-specialty";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  SpecialtyRequest,
  SpecialtyListRequest,
  compareSpecialtyRequestToResponse,
} from "@/lib/api/school/highschool/specialty/request";
import {
  SpecialtyResponse,
  SpecialtyListResponse,
} from "@/lib/api/school/highschool/specialty/response";
import {
  getSpecialtyList,
  postSpecialty,
  updateSpecialty,
  deleteSpecialty,
  deleteMultipleSpecialty,
} from "@/lib/api/school/highschool/specialty/routes";
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
        SpecialtyRequest,
        SpecialtyResponse,
        SpecialtyListRequest,
        SpecialtyListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("specialty")}
        downloadUploadTableName="highschool_specialties"
        queryKeyData="admin-specialties-data"
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
        columns={TableColumsSpecialty({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareSpecialtyRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateSpecialty}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionSpecialty(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("section"),
              description: DescriptionSection(item?.section ?? undefined),
            },
          ];
        }}
        getItemList={getSpecialtyList}
        postItem={postSpecialty}
        updateItem={updateSpecialty}
        deleteItem={deleteSpecialty}
        deleteMultipleItems={deleteMultipleSpecialty}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
