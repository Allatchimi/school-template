"use client";

import {
  DescriptionSchool,
  DescriptionSchoolConfig,
  DescriptionSchoolInfo,
} from "@/components/description/school/common/description-school";
import {
  FilterType,
  filterTypeTemplate,
} from "@/components/filter/default-filters";
import FormAddUpdateSchool from "@/components/form/school/common/form-add-update-school";
import { TableColumsSchool } from "@/components/table/columns/school/common/columns-school";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  SchoolRequest,
  SchoolListRequest,
  compareSchoolRequestToResponse,
} from "@/lib/api/school/common/school/request";
import {
  SchoolResponse,
  SchoolListResponse,
} from "@/lib/api/school/common/school/response";
import {
  getSchoolList,
  deleteMultipleSchool,
  postSchool,
  updateSchool,
  deleteSchool,
} from "@/lib/api/school/common/school/routes";
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
        SchoolRequest,
        SchoolResponse,
        SchoolListRequest,
        SchoolListResponse,
        FilterType
      >
        itemLabel={tWords("school")}
        itemLabelUpdateErrorDetails="(should be unique with name, website domain name and email domain name)"
        downloadUploadTableName="schools"
        queryKeyData="admin-schools-data"
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
        filterTemplate={filterTypeTemplate}
        columns={TableColumsSchool({
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareSchoolRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateSchool}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionSchool(item) },
            {
              title: tWords("information"),
              description: DescriptionSchoolInfo(item?.info ?? undefined),
            },
            {
              title: tWords("configuration"),
              description: DescriptionSchoolConfig(item?.config ?? undefined),
            },
          ];
        }}
        getItemList={getSchoolList}
        postItem={postSchool}
        updateItem={updateSchool}
        deleteItem={deleteSchool}
        deleteMultipleItems={deleteMultipleSchool}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
