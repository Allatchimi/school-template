"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionDomain } from "@/components/description/school/university/description-domain";
import { DescriptionLevel } from "@/components/description/school/university/description-level";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateLevelDomain from "@/components/form/school/university/form-add-update-level-domain";
import { TableColumsLevelDomain } from "@/components/table/columns/school/university/columns-level-domain";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  LevelDomainRequest,
  LevelDomainListRequest,
  compareLevelDomainRequestToResponse,
} from "@/lib/api/school/university/level/request";
import {
  LevelDomainResponse,
  LevelDomainListResponse,
} from "@/lib/api/school/university/level/response";
import {
  getLevelDomainList,
  postLevelDomain,
  updateLevelDomain,
  deleteLevelDomain,
  deleteMultipleLevelDomain,
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
        LevelDomainRequest,
        LevelDomainResponse,
        LevelDomainListRequest,
        LevelDomainListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("levelDomain")}
        downloadUploadTableName="level_domains"
        queryKeyData="admin-level-domains-data"
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
        columns={TableColumsLevelDomain({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareLevelDomainRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateLevelDomain}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionLevelDomain(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("level"),
              description: DescriptionLevel(item?.level ?? undefined),
            },
            {
              title: tWords("domain"),
              description: DescriptionDomain(item?.domain ?? undefined),
            },
          ];
        }}
        getItemList={getLevelDomainList}
        postItem={postLevelDomain}
        updateItem={updateLevelDomain}
        deleteItem={deleteLevelDomain}
        deleteMultipleItems={deleteMultipleLevelDomain}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
