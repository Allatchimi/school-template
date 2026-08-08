"use client";

import ClassSubjectList from "@/components/card-list/school/highschool/class-subject-list";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionClassSubject } from "@/components/description/school/highschool/description-class-subject";
import { DescriptionSubject } from "@/components/description/school/highschool/description-subject";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import {
  ClassSubjectRequest,
  ClassSubjectListRequest,
} from "@/lib/api/school/highschool/class/request";
import {
  ClassSubjectResponse,
  ClassSubjectListResponse,
} from "@/lib/api/school/highschool/class/response";
import { getClassSubjectList } from "@/lib/api/school/highschool/class/routes";
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
      value: "coefficient",
      label: tWords("coefficient"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        ClassSubjectRequest,
        ClassSubjectResponse,
        ClassSubjectListRequest,
        ClassSubjectListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("subject")}
        queryKeyData="teacher-class-subjects-data"
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolTypeTemplate}
        returnDescriptionsNode={(item) => {
          return [
            { description: DescriptionClassSubject(item) },
            {
              title: tWords("class"),
              description: DescriptionClass(item?.class ?? undefined),
            },
            {
              title: tWords("subject"),
              description: DescriptionSubject(item?.subject ?? undefined),
            },
          ];
        }}
        dialogDescriptionWidth={800}
        returnItemListNode={ClassSubjectList}
        getItemList={getClassSubjectList}
      />
    </>
  );
}
