"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionFaculty } from "@/components/description/school/university/description-faculty";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateFaculty from "@/components/form/school/university/form-add-update-faculty";
import { TableColumsFaculty } from "@/components/table/columns/school/university/columns-faculty";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  FacultyRequest,
  FacultyListRequest,
  compareFacultyRequestToResponse,
} from "@/lib/api/school/university/faculty/request";
import {
  FacultyResponse,
  FacultyListResponse,
} from "@/lib/api/school/university/faculty/response";
import {
  getFacultyList,
  postFaculty,
  updateFaculty,
  deleteFaculty,
  deleteMultipleFaculty,
} from "@/lib/api/school/university/faculty/routes";
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
        FacultyRequest,
        FacultyResponse,
        FacultyListRequest,
        FacultyListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("faculty")}
        downloadUploadTableName="university_faculties"
        queryKeyData="admin-faculties-data"
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
        columns={TableColumsFaculty({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareFacultyRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateFaculty}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionFaculty(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getFacultyList}
        postItem={postFaculty}
        updateItem={updateFaculty}
        deleteItem={deleteFaculty}
        deleteMultipleItems={deleteMultipleFaculty}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
