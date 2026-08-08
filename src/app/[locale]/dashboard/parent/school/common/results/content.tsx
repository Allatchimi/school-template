"use client";

import { DescriptionExam } from "@/components/description/school/common/description-exam";
import { DescriptionResult } from "@/components/description/school/common/description-result";
import { DescriptionStudent } from "@/components/description/school/common/description-student";
import {
  FilterSchoolYearStudentType,
  filterSchoolYearStudentTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student-multiple";
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
import { getResultList } from "@/lib/api/school/common/result/routes";
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
        FilterSchoolYearStudentType
      >
        itemLabel={tWords("result")}
        downloadUploadTableName="results"
        queryKeyData="student-results-data"
        canDownload={true}
        addDefaultActions={true}
        dialogDescriptionWidth={800}
        searchParams={searchParams}
        filterTemplate={filterSchoolYearStudentTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              <FormItemSelectStudent
                disabled={loading}
                defaultValue={values?.studentID?.toString()}
                request={{
                  schoolID: SchoolConfig?.schoolID(),
                }}
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
            {
              title: undefined,
              description: DescriptionResult(item),
            },
            {
              title: tWords("exam"),
              description: DescriptionExam(item?.exam ?? undefined),
            },
            {
              title: tWords("student"),
              description: DescriptionStudent(item?.student ?? undefined),
            },
          ];
        }}
        getItemList={getResultList}
      />
    </>
  );
}
