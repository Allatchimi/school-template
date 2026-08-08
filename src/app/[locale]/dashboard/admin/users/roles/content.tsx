"use client";

import { DescriptionRole } from "@/components/description/user/description-role";
import {
  FilterType,
  filterTypeTemplate,
} from "@/components/filter/default-filters";
import FormAddUpdateRole from "@/components/form/user/form-add-update-role";
import { TableColumsRole } from "@/components/table/columns/user/columns-role";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  RoleRequest,
  RoleListRequest,
  compareRoleRequestToResponse,
} from "@/lib/api/user/role/request";
import { RoleResponse, RoleListResponse } from "@/lib/api/user/role/response";
import {
  getRoleList,
  postRole,
  updateRole,
  deleteRole,
  deleteMultipleRole,
} from "@/lib/api/user/role/routes";
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
        RoleRequest,
        RoleResponse,
        RoleListRequest,
        RoleListResponse,
        FilterType
      >
        itemLabel={tWords("role")}
        downloadUploadTableName="roles"
        queryKeyData="admin-roles-data"
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
        columns={TableColumsRole({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareRoleRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateRole}
        returnDescriptions={(item) => {
          return [
            {
              description: DescriptionRole(item),
            },
          ];
        }}
        getItemList={getRoleList}
        postItem={postRole}
        updateItem={updateRole}
        deleteItem={deleteRole}
        deleteMultipleItems={deleteMultipleRole}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
