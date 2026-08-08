"use client";

import { DescriptionParent } from "@/components/description/school/common/description-parent";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateParent from "@/components/form/school/common/form-add-update-parent";
import { TableColumsParent } from "@/components/table/columns/school/common/columns-parent";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ParentRequest,
  ParentListRequest,
  compareParentRequestToResponse,
} from "@/lib/api/school/common/parent/request";
import {
  ParentResponse,
  ParentListResponse,
} from "@/lib/api/school/common/parent/response";
import {
  getParentList,
  postParent,
  updateParent,
  deleteParent,
  deleteMultipleParent,
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
        ParentRequest,
        ParentResponse,
        ParentListRequest,
        ParentListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("parent")}
        downloadUploadTableName="parents"
        queryKeyData="admin-parents-data"
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
        columns={TableColumsParent({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareParentRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateParent}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionParent(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getParentList}
        postItem={postParent}
        updateItem={updateParent}
        deleteItem={deleteParent}
        deleteMultipleItems={deleteMultipleParent}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
