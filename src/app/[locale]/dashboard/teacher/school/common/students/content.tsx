"use client";

import { DescriptionStudentEnroll } from "@/components/description/school/common/description-student-enroll";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import { TableColumsStudentEnroll } from "@/components/table/columns/school/common/columns-student-enroll";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import { downloadData } from "@/lib/api/others/upload-download/routes";
import {
  StudentEnrollRequest,
  StudentEnrollListRequest,
} from "@/lib/api/school/common/student/request";
import {
  StudentEnrollResponse,
  StudentEnrollListResponse,
} from "@/lib/api/school/common/student/response";
import { getStudentEnrollList } from "@/lib/api/school/common/student/routes";
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
  const paramOrderBy = searchParams?.get("orderBy") as string | undefined;
  const paramSort = searchParams?.get("sort") as string | undefined;

  return (
    <>
      <ContentTableTemplate<
        StudentEnrollRequest,
        StudentEnrollResponse,
        StudentEnrollListRequest,
        StudentEnrollListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("student")}
        downloadUploadTableName="student_enrolls"
        queryKeyData="teacher-students-data"
        canAdd={false}
        canUpdate={false}
        canDeleteOne={false}
        canDeleteMultiple={false}
        canUpload={false}
        canDownload={true}
        addDefaultActions={true}
        dialogFormAddUpdateWidth={800}
        dialogDescriptionWidth={800}
        searchParams={searchParams}
        filterTemplate={filterSchoolYearClassLevelDomainTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL ? (
                <FormItemSelectClass
                  disabled={loading}
                  defaultValue={values?.classID?.toString()}
                  request={{
                    schoolID: SchoolConfig?.schoolID(),
                  }}
                  allowEmptySelection={true}
                  allowEmptySelectionLabel="*"
                  noMargin={true}
                />
              ) : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY ? (
                <FormItemSelectLevelDomain
                  disabled={loading}
                  defaultValue={values?.levelDomainID?.toString()}
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
        columns={TableColumsStudentEnroll({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={undefined}
        returnFormAddUpdateNode={undefined}
        returnDescriptions={(item) => {
          return [
            {
              description: DescriptionStudentEnroll(item),
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
        getItemList={getStudentEnrollList}
        postItem={undefined}
        updateItem={undefined}
        deleteItem={undefined}
        deleteMultipleItems={undefined}
        uploadData={undefined}
        downloadData={downloadData}
      />
    </>
  );
}
