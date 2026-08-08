"use client";

import { DescriptionQuiz } from "@/components/description/school/common/description-quiz";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdateQuiz from "@/components/form/school/common/form-add-update-quiz";
import { TableColumsQuiz } from "@/components/table/columns/school/common/columns-quiz";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  QuizRequest,
  QuizListRequest,
  compareQuizRequestToResponse,
} from "@/lib/api/school/common/quiz/request";
import {
  QuizResponse,
  QuizListResponse,
} from "@/lib/api/school/common/quiz/response";
import {
  getQuizList,
  postQuiz,
  updateQuiz,
  deleteQuiz,
  deleteMultipleQuiz,
} from "@/lib/api/school/common/quiz/routes";
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
        QuizRequest,
        QuizResponse,
        QuizListRequest,
        QuizListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("quiz")}
        downloadUploadTableName="quizzes"
        queryKeyData="admin-quizzes-data"
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
        columns={TableColumsQuiz({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={compareQuizRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateQuiz}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionQuiz(item) },
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
        getItemList={getQuizList}
        postItem={postQuiz}
        updateItem={updateQuiz}
        deleteItem={deleteQuiz}
        deleteMultipleItems={deleteMultipleQuiz}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
