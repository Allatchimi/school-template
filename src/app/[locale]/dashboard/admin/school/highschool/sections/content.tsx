"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionSection } from "@/components/description/school/highschool/description-section";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateSection from "@/components/form/school/highschool/form-add-update-section";
import { TableColumsSection } from "@/components/table/columns/school/highschool/columns-section";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  SectionRequest,
  SectionListRequest,
  compareSectionRequestToResponse,
} from "@/lib/api/school/highschool/section/request";
import {
  SectionResponse,
  SectionListResponse,
} from "@/lib/api/school/highschool/section/response";
import {
  getSectionList,
  postSection,
  updateSection,
  deleteSection,
  deleteMultipleSection,
} from "@/lib/api/school/highschool/section/routes";
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
        SectionRequest,
        SectionResponse,
        SectionListRequest,
        SectionListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("section")}
        downloadUploadTableName="highschool_sections"
        queryKeyData="admin-sections-data"
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
        columns={TableColumsSection({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareSectionRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateSection}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionSection(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getSectionList}
        postItem={postSection}
        updateItem={updateSection}
        deleteItem={deleteSection}
        deleteMultipleItems={deleteMultipleSection}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
