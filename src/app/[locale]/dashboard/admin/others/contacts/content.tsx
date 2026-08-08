"use client";

import { DescriptionContact } from "@/components/description/others/description-contact";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { TableColumsContact } from "@/components/table/columns/others/columns-contact";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ContactRequest,
  ContactListRequest,
} from "@/lib/api/others/contact/request";
import {
  ContactResponse,
  ContactListResponse,
} from "@/lib/api/others/contact/response";
import { getContactList } from "@/lib/api/others/contact/routes";
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
        ContactRequest,
        ContactResponse,
        ContactListRequest,
        ContactListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("contact")}
        downloadUploadTableName="contacts"
        queryKeyData="admin-contacts-data"
        canAdd={false}
        canUpdate={false}
        canDeleteOne={false}
        canDeleteMultiple={false}
        canSelectMultiple={false}
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
        columns={TableColumsContact({
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={undefined}
        returnFormAddUpdateNode={undefined}
        returnDescriptions={(item) => {
          return [
            {
              description: DescriptionContact(item),
            },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getContactList}
        postItem={undefined}
        updateItem={undefined}
        deleteItem={undefined}
        deleteMultipleItems={undefined}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
