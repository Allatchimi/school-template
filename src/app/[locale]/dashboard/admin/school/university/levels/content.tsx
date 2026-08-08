"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionLevel } from "@/components/description/school/university/description-level";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateLevel from "@/components/form/school/university/form-add-update-level";
import { TableColumsLevel } from "@/components/table/columns/school/university/columns-level";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  LevelRequest,
  LevelListRequest,
  compareLevelRequestToResponse,
} from "@/lib/api/school/university/level/request";
import {
  LevelResponse,
  LevelListResponse,
} from "@/lib/api/school/university/level/response";
import {
  getLevelList,
  postLevel,
  updateLevel,
  deleteLevel,
  deleteMultipleLevel,
} from "@/lib/api/school/university/level/routes";
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
        LevelRequest,
        LevelResponse,
        LevelListRequest,
        LevelListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("level")}
        downloadUploadTableName="university_levels"
        queryKeyData="admin-levels-data"
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
        columns={TableColumsLevel({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareLevelRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateLevel}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionLevel(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getLevelList}
        postItem={postLevel}
        updateItem={updateLevel}
        deleteItem={deleteLevel}
        deleteMultipleItems={deleteMultipleLevel}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
