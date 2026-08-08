"use client";

import { DescriptionManager } from "@/components/description/school/common/description-manager";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import FormAddUpdateManager from "@/components/form/school/common/form-add-update-manager";
import { TableColumsManager } from "@/components/table/columns/school/common/columns-manager";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ManagerRequest,
  ManagerListRequest,
  compareManagerRequestToResponse,
} from "@/lib/api/school/common/manager/request";
import {
  ManagerResponse,
  ManagerListResponse,
} from "@/lib/api/school/common/manager/response";
import {
  getManagerList,
  postManager,
  updateManager,
  deleteManager,
  deleteMultipleManager,
} from "@/lib/api/school/common/manager/routes";
import { useSearchParams } from "next/navigation";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import { useTranslations } from "next-intl";

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
        ManagerRequest,
        ManagerResponse,
        ManagerListRequest,
        ManagerListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("manager")}
        downloadUploadTableName="managers"
        queryKeyData="admin-managers-data"
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
        columns={TableColumsManager({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareManagerRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateManager}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionManager(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getManagerList}
        postItem={postManager}
        updateItem={updateManager}
        deleteItem={deleteManager}
        deleteMultipleItems={deleteMultipleManager}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
