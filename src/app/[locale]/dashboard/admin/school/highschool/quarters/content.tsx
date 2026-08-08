"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionQuarter } from "@/components/description/school/highschool/description-quarter";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateQuarter from "@/components/form/school/highschool/form-add-update-quarter";
import { TableColumsQuarter } from "@/components/table/columns/school/highschool/columns-quarter";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  QuarterRequest,
  QuarterListRequest,
  compareQuarterRequestToResponse,
} from "@/lib/api/school/highschool/quarter/request";
import {
  QuarterResponse,
  QuarterListResponse,
} from "@/lib/api/school/highschool/quarter/response";
import {
  getQuarterList,
  postQuarter,
  updateQuarter,
  deleteQuarter,
  deleteMultipleQuarter,
} from "@/lib/api/school/highschool/quarter/routes";
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
        QuarterRequest,
        QuarterResponse,
        QuarterListRequest,
        QuarterListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("quarter")}
        downloadUploadTableName="highschool_quarters"
        queryKeyData="admin-quarters-data"
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
        columns={TableColumsQuarter({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareQuarterRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateQuarter}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionQuarter(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getQuarterList}
        postItem={postQuarter}
        updateItem={updateQuarter}
        deleteItem={deleteQuarter}
        deleteMultipleItems={deleteMultipleQuarter}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
