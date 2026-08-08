"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionDomain } from "@/components/description/school/university/description-domain";
import { DescriptionLevel } from "@/components/description/school/university/description-level";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { DescriptionSemester } from "@/components/description/school/university/description-semester";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateUnit from "@/components/form/school/university/form-add-update-unit";
import { TableColumsUnit } from "@/components/table/columns/school/university/columns-unit";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  UnitRequest,
  UnitListRequest,
  compareUnitRequestToResponse,
} from "@/lib/api/school/university/unit/request";
import {
  UnitResponse,
  UnitListResponse,
} from "@/lib/api/school/university/unit/response";
import {
  getUnitList,
  postUnit,
  updateUnit,
  deleteUnit,
  deleteMultipleUnit,
} from "@/lib/api/school/university/unit/routes";
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
        UnitRequest,
        UnitResponse,
        UnitListRequest,
        UnitListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("unit")}
        downloadUploadTableName="university_units"
        queryKeyData="admin-units-data"
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
        columns={TableColumsUnit({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareUnitRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateUnit}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionUnit(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("levelDomain"),
              description: DescriptionLevelDomain(
                item?.levelDomain ?? undefined
              ),
            },
            {
              title: tWords("level"),
              description: DescriptionLevel(
                item?.levelDomain?.level ?? undefined
              ),
            },
            {
              title: tWords("domain"),
              description: DescriptionDomain(
                item?.levelDomain?.domain ?? undefined
              ),
            },
            {
              title: tWords("semester"),
              description: DescriptionSemester(item?.semester ?? undefined),
            },
          ];
        }}
        getItemList={getUnitList}
        postItem={postUnit}
        updateItem={updateUnit}
        deleteItem={deleteUnit}
        deleteMultipleItems={deleteMultipleUnit}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
