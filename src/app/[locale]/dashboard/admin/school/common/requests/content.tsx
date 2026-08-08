"use client";

import { DescriptionRequest } from "@/components/description/school/common/description-request";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionSequence } from "@/components/description/school/highschool/description-sequence";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateRequestStatus from "@/components/form/school/common/form-add-update-request-status";
import { TableColumsRequest } from "@/components/table/columns/school/common/columns-request";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  RequestRequest,
  RequestListRequest,
  compareRequestRequestToResponse,
} from "@/lib/api/school/common/request/request";
import {
  RequestResponse,
  RequestListResponse,
} from "@/lib/api/school/common/request/response";
import {
  getRequestList,
  deleteRequest,
  deleteMultipleRequest,
  updateRequestStatus,
} from "@/lib/api/school/common/request/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
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
        RequestRequest,
        RequestResponse,
        RequestListRequest,
        RequestListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("request")}
        downloadUploadTableName="requests"
        queryKeyData="admin-requests-data"
        canAdd={false}
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
        filterTemplate={filterSchoolYearClassLevelDomainTypeTemplate}
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
        columns={TableColumsRequest({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareRequestRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateRequestStatus}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionRequest(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("year"),
              description: DescriptionYear(item?.year ?? undefined),
            },
            ...(item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
              ? [
                  {
                    title: tWords("subject"),
                    description: DescriptionClassSubject(
                      item?.classSubject ?? undefined
                    ),
                  },
                  {
                    title: tWords("class"),
                    description: DescriptionClass(
                      item?.classSubject?.class ?? undefined
                    ),
                  },
                  {
                    title: tWords("sequence"),
                    description: DescriptionSequence(
                      item?.sequence ?? undefined
                    ),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("unit"),
                      description: DescriptionUnit(item?.unit ?? undefined),
                    },
                    {
                      title: tWords("levelDomain"),
                      description: DescriptionLevelDomain(
                        item?.unit?.levelDomain ?? undefined
                      ),
                    },
                  ]
                : [
                    {
                      title: tWords("subjectUnit"),
                      description: undefined,
                    },
                  ]),
          ];
        }}
        getItemList={getRequestList}
        postItem={undefined}
        updateItem={updateRequestStatus}
        deleteItem={deleteRequest}
        deleteMultipleItems={deleteMultipleRequest}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
