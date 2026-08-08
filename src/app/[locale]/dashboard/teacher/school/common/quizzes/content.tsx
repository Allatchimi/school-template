"use client";

import QuizList from "@/components/card-list/school/common/quiz-list";
import { DescriptionQuiz } from "@/components/description/school/common/description-quiz";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import FormAddUpdateQuiz from "@/components/form/school/common/form-add-update-quiz";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
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
  postQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizList,
} from "@/lib/api/school/common/quiz/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  const orderByList = [
    {
      value: "",
      label: tWords("default"),
    },
    {
      value: "title",
      label: tWords("title"),
    },
    {
      value: "status",
      label: tWords("status"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        QuizRequest,
        QuizResponse,
        QuizListRequest,
        QuizListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("quiz")}
        queryKeyData="teacher-quizzes-data"
        canAdd={true}
        canUpdate={true}
        canDelete={true}
        dialogDescriptionWidth={800}
        dialogFormAddUpdateWidth={800}
        filterOrderByList={orderByList}
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
        returnDescriptionsNode={(item) => {
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
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("unit"),
                      description: DescriptionUnit(item?.unit ?? undefined),
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
        areEqual={compareQuizRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdateQuiz}
        returnItemListNode={QuizList}
        postItem={postQuiz}
        updateItem={updateQuiz}
        deleteItem={deleteQuiz}
        getItemList={getQuizList}
      />
    </>
  );
}
