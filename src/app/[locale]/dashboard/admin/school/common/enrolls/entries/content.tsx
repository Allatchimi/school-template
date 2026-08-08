"use client";

import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionStudent } from "@/components/description/school/common/description-student";
import { DescriptionStudentEnroll } from "@/components/description/school/common/description-student-enroll";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateStudentEnroll from "@/components/form/school/common/form-add-update-student-enroll";
import { TableColumsStudentEnroll } from "@/components/table/columns/school/common/columns-student-enroll";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  StudentEnrollRequest,
  StudentEnrollListRequest,
  compareStudentEnrollRequestToResponse,
} from "@/lib/api/school/common/student/request";
import {
  StudentEnrollResponse,
  StudentEnrollListResponse,
} from "@/lib/api/school/common/student/response";
import {
  getStudentEnrollList,
  postStudentEnroll,
  deleteStudentEnroll,
  deleteMultipleStudentEnroll,
  updateStudentEnroll,
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
        StudentEnrollRequest,
        StudentEnrollResponse,
        StudentEnrollListRequest,
        StudentEnrollListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("enroll")}
        downloadUploadTableName="enrolls"
        queryKeyData="admin-enrolls-data"
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
        columns={TableColumsStudentEnroll({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareStudentEnrollRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateStudentEnroll}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionStudentEnroll(item) },
            {
              title: tWords("student"),
              description: DescriptionStudent(item?.student ?? undefined),
            },
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
        getItemList={getStudentEnrollList}
        postItem={postStudentEnroll}
        updateItem={updateStudentEnroll}
        deleteItem={deleteStudentEnroll}
        deleteMultipleItems={deleteMultipleStudentEnroll}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
