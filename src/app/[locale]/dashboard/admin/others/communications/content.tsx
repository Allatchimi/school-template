"use client";

import { DescriptionCommunication } from "@/components/description/others/description-communication";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateCommunication from "@/components/form/others/form-add-update-communication";
import { TableColumsCommunication } from "@/components/table/columns/others/columns-communication";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  CommunicationRequest,
  CommunicationListRequest,
} from "@/lib/api/others/communication/request";
import {
  CommunicationResponse,
  CommunicationListResponse,
} from "@/lib/api/others/communication/response";
import {
  getCommunicationList,
  postCommunication,
} from "@/lib/api/others/communication/routes";
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
        CommunicationRequest,
        CommunicationResponse,
        CommunicationListRequest,
        CommunicationListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("communication")}
        downloadUploadTableName="communications"
        queryKeyData="admin-communications-data"
        canAdd={true}
        canUpdate={false}
        canDeleteOne={false}
        canDeleteMultiple={false}
        canSelectMultiple={false}
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
                noMargin={true}
              />
            </div>
          );
        }}
        columns={TableColumsCommunication({
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={undefined}
        returnFormAddUpdateNode={FormAddUpdateCommunication}
        returnDescriptions={(item) => {
          return [
            {
              description: DescriptionCommunication(item),
            },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getCommunicationList}
        postItem={postCommunication}
        updateItem={undefined}
        deleteItem={undefined}
        deleteMultipleItems={undefined}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
