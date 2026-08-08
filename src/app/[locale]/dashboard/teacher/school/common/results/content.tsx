"use client";

import { DescriptionExam } from "@/components/description/school/common/description-exam";
import { DescriptionResult } from "@/components/description/school/common/description-result";
import { DescriptionStudent } from "@/components/description/school/common/description-student";
import {
  FilterSchoolYearClassSubjectUnitType,
  filterSchoolYearClassSubjectUnitTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormAddUpdateResult from "@/components/form/school/common/form-add-update-result";
import { TableColumsResult } from "@/components/table/columns/school/common/columns-result";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import { downloadData } from "@/lib/api/others/upload-download/routes";
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
  deleteMultipleResult,
  deleteResult,
  getResultList,
  postResult,
  updateResult,
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
        FilterSchoolYearClassSubjectUnitType
      >
        itemLabel={tWords("result")}
        downloadUploadTableName="results"
        queryKeyData="teacher-results-data"
        canSelectMultiple={true}
        canAdd={true}
        canUpdate={true}
        canDeleteOne={true}
        canDeleteMultiple={true}
        canDownload={true}
        addDefaultActions={true}
        dialogFormAddUpdateWidth={600}
        dialogDescriptionWidth={800}
        searchParams={searchParams}
        filterTemplate={filterSchoolYearClassSubjectUnitTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL ? (
                <FormItemSelectClassSubject
                  disabled={loading}
                  defaultValue={values?.classSubjectID?.toString()}
                  request={{
                    schoolID: SchoolConfig?.schoolID(),
                  }}
                  allowEmptySelection={true}
                  allowEmptySelectionLabel="*"
                  noMargin={true}
                />
              ) : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY ? (
                <FormItemSelectUnit
                  disabled={loading}
                  defaultValue={values?.unitID?.toString()}
                  request={{
                    schoolID: SchoolConfig?.schoolID(),
                  }}
                  allowEmptySelection={true}
                  allowEmptySelectionLabel="*"
                  noMargin={true}
                />
              ) : undefined}
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
        postItem={postResult}
        updateItem={updateResult}
        deleteItem={deleteResult}
        deleteMultipleItems={deleteMultipleResult}
        downloadData={downloadData}
      />
    </>
  );
}
