"use client";

import { DescriptionCourse } from "@/components/description/school/common/description-course";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateCourse from "@/components/form/school/common/form-add-update-course";
import { TableColumsCourse } from "@/components/table/columns/school/common/columns-course";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  CourseRequest,
  CourseListRequest,
  compareCourseRequestToResponse,
} from "@/lib/api/school/common/course/request";
import {
  CourseResponse,
  CourseListResponse,
} from "@/lib/api/school/common/course/response";
import {
  getCourseList,
  deleteMultipleCourse,
  postCourse,
  updateCourse,
  deleteCourse,
} from "@/lib/api/school/common/course/routes";
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
        CourseRequest,
        CourseResponse,
        CourseListRequest,
        CourseListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("course")}
        downloadUploadTableName="courses"
        queryKeyData="admin-courses-data"
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
        columns={TableColumsCourse({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareCourseRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateCourse}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionCourse(item) },
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
                    title: tWords("subject"),
                    description: DescriptionClassSubject(
                      item?.classSubject ?? undefined
                    ),
                  },
                  {
                    title: tWords("class"),
                    description: DescriptionClass(
                      item?.classSubject?.class ?? undefined
                    ),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("unit"),
                      description: DescriptionUnit(item?.unit ?? undefined),
                    },
                    {
                      title: tWords("levelDomain"),
                      description: DescriptionLevelDomain(
                        item?.unit?.levelDomain ?? undefined
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
        getItemList={getCourseList}
        postItem={postCourse}
        updateItem={updateCourse}
        deleteItem={deleteCourse}
        deleteMultipleItems={deleteMultipleCourse}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
