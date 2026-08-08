"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionRole } from "@/components/description/user/description-role";
import {
  DescriptionUser,
  DescriptionUserInfo,
  DescriptionUserConfig,
} from "@/components/description/user/description-user";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateUser from "@/components/form/user/form-add-update-user";
import { TableColumsUser } from "@/components/table/columns/user/columns-user";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  compareUserRequestToResponse,
  UserListRequest,
  UserRequest,
} from "@/lib/api/user/user/request";
import { UserResponse, UserListResponse } from "@/lib/api/user/user/response";
import {
  deleteMultipleUser,
  deleteUser,
  getUserList,
  postUser,
  updateUser,
} from "@/lib/api/user/user/routes";
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
        UserRequest,
        UserResponse,
        UserListRequest,
        UserListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("user")}
        downloadUploadTableName="users"
        queryKeyData="admin-users-data"
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
        columns={TableColumsUser({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareUserRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateUser}
        returnDescriptions={(item) => {
          return [
            {
              description: DescriptionUser(item),
            },
            {
              title: tWords("role"),
              description: DescriptionRole(item?.role ?? undefined),
            },
            {
              title: tWords("information"),
              description: DescriptionUserInfo(item?.info ?? undefined),
            },
            {
              title: tWords("configuration"),
              description: DescriptionUserConfig(item?.config ?? undefined),
            },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getUserList}
        postItem={postUser}
        updateItem={updateUser}
        deleteItem={deleteUser}
        deleteMultipleItems={deleteMultipleUser}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
