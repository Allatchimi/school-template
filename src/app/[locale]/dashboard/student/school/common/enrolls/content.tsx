"use client";

import StudentEnrollList from "@/components/card-list/school/common/student-enroll-list";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionStudentEnroll } from "@/components/description/school/common/description-student-enroll";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolYearType,
  filterSchoolYearTypeTemplate,
} from "@/components/filter/default-filters";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
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

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  const orderByList = [
    {
      value: "",
      label: tWords("default"),
    },
    {
      value: "status",
      label: tWords("status"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        StudentEnrollRequest,
        StudentEnrollResponse,
        StudentEnrollListRequest,
        StudentEnrollListResponse,
        FilterSchoolYearType
      >
        itemLabel={tWords("enroll")}
        queryKeyData="student-enrolls-data"
        dialogDescriptionWidth={800}
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolYearTypeTemplate}
        returnDescriptionsNode={(item) => {
          return [
            { description: DescriptionStudentEnroll(item) },
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
        returnItemListNode={StudentEnrollList}
        getItemList={getStudentEnrollList}
      />
    </>
  );
}
