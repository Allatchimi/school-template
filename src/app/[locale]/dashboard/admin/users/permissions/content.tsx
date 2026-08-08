"use client";

import { DescriptionPermission } from "@/components/description/user/description-permission";
import { DescriptionRole } from "@/components/description/user/description-role";
import {
  FilterType,
  filterTypeTemplate,
} from "@/components/filter/default-filters";
import FormAddUpdatePermission from "@/components/form/user/form-add-update-permission";
import { TableColumsPermission } from "@/components/table/columns/user/columns-permission";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  PermissionRequest,
  PermissionListRequest,
  comparePermissionRequestToResponse,
} from "@/lib/api/user/permission/request";
import {
  PermissionResponse,
  PermissionListResponse,
} from "@/lib/api/user/permission/response";
import {
  getPermissionList,
  updatePermission,
  deletePermission,
  deleteMultiplePermission,
} from "@/lib/api/user/permission/routes";
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
        PermissionRequest,
        PermissionResponse,
        PermissionListRequest,
        PermissionListResponse,
        FilterType
      >
        itemLabel={tWords("permission")}
        downloadUploadTableName="permissions"
        queryKeyData="admin-permissions-data"
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
        filterTemplate={filterTypeTemplate}
        columns={TableColumsPermission({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={comparePermissionRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdatePermission}
        returnDescriptions={(item) => {
          return [
            {
              description: DescriptionPermission(item),
            },
            {
              title: tWords("role"),
              description: DescriptionRole(item?.role ?? undefined),
            },
          ];
        }}
        getItemList={getPermissionList}
        postItem={updatePermission}
        updateItem={updatePermission}
        deleteItem={deletePermission}
        deleteMultipleItems={deleteMultiplePermission}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
