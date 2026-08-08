"use client";

import ClassList from "@/components/card-list/school/highschool/class-list";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionSpecialty } from "@/components/description/school/highschool/description-specialty";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import {
  ClassRequest,
  ClassListRequest,
} from "@/lib/api/school/highschool/class/request";
import {
  ClassResponse,
  ClassListResponse,
} from "@/lib/api/school/highschool/class/response";
import { getClassList } from "@/lib/api/school/highschool/class/routes";
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
      value: "name",
      label: tWords("name"),
    },
    {
      value: "fees",
      label: tWords("fees"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        ClassRequest,
        ClassResponse,
        ClassListRequest,
        ClassListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("class")}
        queryKeyData="teacher-classes-data"
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolTypeTemplate}
        returnDescriptionsNode={(item) => {
          return [
            { description: DescriptionClass(item) },
            {
              title: tWords("specialty"),
              description: DescriptionSpecialty(item?.specialty ?? undefined),
            },
          ];
        }}
        dialogDescriptionWidth={800}
        returnItemListNode={ClassList}
        getItemList={getClassList}
      />
    </>
  );
}
