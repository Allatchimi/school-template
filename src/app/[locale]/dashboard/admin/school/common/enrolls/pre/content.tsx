"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionStudentPreEnroll } from "@/components/description/school/common/description-student-pre-enroll";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateStudentPreEnrollStatus from "@/components/form/school/common/form-add-update-student-pre-enroll-status";
import { TableColumsStudentPreEnroll } from "@/components/table/columns/school/common/columns-student-pre-enroll";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  StudentPreEnrollRequest,
  StudentPreEnrollListRequest,
  compareStudentPreEnrollRequestToResponse,
} from "@/lib/api/school/common/student/request";
import {
  StudentPreEnrollResponse,
  StudentPreEnrollListResponse,
} from "@/lib/api/school/common/student/response";
import {
  getStudentPreEnrollList,
  deleteStudentPreEnroll,
  deleteMultipleStudentPreEnroll,
  updateStudentPreEnrollStatus,
} from "@/lib/api/school/common/student/routes";
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
        StudentPreEnrollRequest,
        StudentPreEnrollResponse,
        StudentPreEnrollListRequest,
        StudentPreEnrollListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("preEnroll")}
        downloadUploadTableName="pre_enrolls"
        queryKeyData="admin-pre-enrolls-data"
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
        columns={TableColumsStudentPreEnroll({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareStudentPreEnrollRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateStudentPreEnrollStatus}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionStudentPreEnroll(item) },
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
                    title: tWords("class"),
                    description: DescriptionClass(item?.class ?? undefined),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("levelDomain"),
                      description: DescriptionLevelDomain(
                        item?.levelDomain ?? undefined
                      ),
                    },
                  ]
                : [
                    {
                      title: tWords("classLevelDomain"),
                      description: undefined,
                    },
                  ]),
          ];
        }}
        getItemList={getStudentPreEnrollList}
        postItem={undefined}
        updateItem={updateStudentPreEnrollStatus}
        deleteItem={deleteStudentPreEnroll}
        deleteMultipleItems={deleteMultipleStudentPreEnroll}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
