"use client";

import { DescriptionExam } from "@/components/description/school/common/description-exam";
import { DescriptionResult } from "@/components/description/school/common/description-result";
import { DescriptionStudent } from "@/components/description/school/common/description-student";
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
import FormAddUpdateResult from "@/components/form/school/common/form-add-update-result";
import { TableColumsResult } from "@/components/table/columns/school/common/columns-result";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  ResultRequest,
  ResultListRequest,
  compareResultRequestToResponse,
} from "@/lib/api/school/common/result/request";
import {
  ResultResponse,
  ResultListResponse,
} from "@/lib/api/school/common/result/response";
import {
  getResultList,
  deleteMultipleResult,
  postResult,
  updateResult,
  deleteResult,
} from "@/lib/api/school/common/result/routes";
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
        ResultRequest,
        ResultResponse,
        ResultListRequest,
        ResultListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("resultEntry")}
        downloadUploadTableName="results"
        queryKeyData="admin-results-data"
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
        columns={TableColumsResult({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareResultRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateResult}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionResult(item) },
            {
              title: tWords("student"),
              description: DescriptionStudent(item?.student ?? undefined),
            },
            {
              title: tWords("exam"),
              description: DescriptionExam(item?.exam ?? undefined),
            },
            ...(item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
              ? [
                  {
                    title: tWords("subject"),
                    description: DescriptionClassSubject(
                      item?.exam?.classSubject ?? undefined
                    ),
                  },
                  {
                    title: tWords("class"),
                    description: DescriptionClass(
                      item?.exam?.classSubject?.class ?? undefined
                    ),
                  },
                  {
                    title: tWords("sequence"),
                    description: DescriptionSequence(
                      item?.exam?.sequence ?? undefined
                    ),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("unit"),
                      description: DescriptionUnit(
                        item?.exam?.unit ?? undefined
                      ),
                    },
                    {
                      title: tWords("levelDomain"),
                      description: DescriptionLevelDomain(
                        item?.exam?.unit?.levelDomain ?? undefined
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
        getItemList={getResultList}
        postItem={postResult}
        updateItem={updateResult}
        deleteItem={deleteResult}
        deleteMultipleItems={deleteMultipleResult}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
