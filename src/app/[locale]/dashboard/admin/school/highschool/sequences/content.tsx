"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionQuarter } from "@/components/description/school/highschool/description-quarter";
import { DescriptionSequence } from "@/components/description/school/highschool/description-sequence";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateSequence from "@/components/form/school/highschool/form-add-update-sequence";
import { TableColumsSequence } from "@/components/table/columns/school/highschool/columns-sequence";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  SequenceRequest,
  SequenceListRequest,
  compareSequenceRequestToResponse,
} from "@/lib/api/school/highschool/sequence/request";
import {
  SequenceResponse,
  SequenceListResponse,
} from "@/lib/api/school/highschool/sequence/response";
import {
  getSequenceList,
  postSequence,
  updateSequence,
  deleteSequence,
  deleteMultipleSequence,
} from "@/lib/api/school/highschool/sequence/routes";
import { SCHOOL_TYPE_HIGHSCHOOL } from "@/lib/constants/school/common/school";
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
        SequenceRequest,
        SequenceResponse,
        SequenceListRequest,
        SequenceListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("sequence")}
        downloadUploadTableName="highschool_sequences"
        queryKeyData="admin-sequences-data"
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
                  type: SCHOOL_TYPE_HIGHSCHOOL,
                }}
                noMargin={true}
              />
            </div>
          );
        }}
        columns={TableColumsSequence({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareSequenceRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateSequence}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionSequence(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("quarter"),
              description: DescriptionQuarter(item?.quarter ?? undefined),
            },
          ];
        }}
        getItemList={getSequenceList}
        postItem={postSequence}
        updateItem={updateSequence}
        deleteItem={deleteSequence}
        deleteMultipleItems={deleteMultipleSequence}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
