"use client";

import { DescriptionDirector } from "@/components/description/school/common/description-director";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateDirector from "@/components/form/school/common/form-add-update-director";
import { TableColumsDirector } from "@/components/table/columns/school/common/columns-director";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  DirectorRequest,
  DirectorListRequest,
  compareDirectorRequestToResponse,
} from "@/lib/api/school/common/director/request";
import {
  DirectorResponse,
  DirectorListResponse,
} from "@/lib/api/school/common/director/response";
import {
  getDirectorList,
  postDirector,
  updateDirector,
  deleteDirector,
  deleteMultipleDirector,
} from "@/lib/api/school/common/director/routes";
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
        DirectorRequest,
        DirectorResponse,
        DirectorListRequest,
        DirectorListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("director")}
        downloadUploadTableName="directors"
        queryKeyData="admin-directors-data"
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
        columns={TableColumsDirector({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareDirectorRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateDirector}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionDirector(item) },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
          ];
        }}
        getItemList={getDirectorList}
        postItem={postDirector}
        updateItem={updateDirector}
        deleteItem={deleteDirector}
        deleteMultipleItems={deleteMultipleDirector}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
