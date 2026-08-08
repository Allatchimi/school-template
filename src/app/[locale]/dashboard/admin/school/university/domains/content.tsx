"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionDepartment } from "@/components/description/school/university/description-department";
import { DescriptionDomain } from "@/components/description/school/university/description-domain";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateDomain from "@/components/form/school/university/form-add-update-domain";
import { TableColumsDomain } from "@/components/table/columns/school/university/columns-domain";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  DomainRequest,
  DomainListRequest,
  compareDomainRequestToResponse,
} from "@/lib/api/school/university/domain/request";
import {
  DomainResponse,
  DomainListResponse,
} from "@/lib/api/school/university/domain/response";
import {
  getDomainList,
  postDomain,
  updateDomain,
  deleteDomain,
  deleteMultipleDomain,
} from "@/lib/api/school/university/domain/routes";
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
        DomainRequest,
        DomainResponse,
        DomainListRequest,
        DomainListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("domain")}
        downloadUploadTableName="university_domains"
        queryKeyData="admin-domains-data"
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
        columns={TableColumsDomain({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareDomainRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateDomain}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionDomain(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("department"),
              description: DescriptionDepartment(item?.department ?? undefined),
            },
          ];
        }}
        getItemList={getDomainList}
        postItem={postDomain}
        updateItem={updateDomain}
        deleteItem={deleteDomain}
        deleteMultipleItems={deleteMultipleDomain}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
