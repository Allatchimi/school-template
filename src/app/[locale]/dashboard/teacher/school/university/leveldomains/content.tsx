"use client";

import LevelDomainList from "@/components/card-list/school/university/level-domain-list";
import { DescriptionDomain } from "@/components/description/school/university/description-domain";
import { DescriptionLevel } from "@/components/description/school/university/description-level";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import {
  LevelDomainRequest,
  LevelDomainListRequest,
} from "@/lib/api/school/university/level/request";
import {
  LevelDomainResponse,
  LevelDomainListResponse,
} from "@/lib/api/school/university/level/response";
import { getLevelDomainList } from "@/lib/api/school/university/level/routes";
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
      value: "fees",
      label: tWords("fees"),
    },
  ];

  return (
    <>
      <ContentCardListTemplate<
        LevelDomainRequest,
        LevelDomainResponse,
        LevelDomainListRequest,
        LevelDomainListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("levelDomain")}
        queryKeyData="teacher-level-domains-data"
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolTypeTemplate}
        returnDescriptionsNode={(item) => {
          return [
            { description: DescriptionLevelDomain(item) },
            {
              title: tWords("level"),
              description: DescriptionLevel(item?.level ?? undefined),
            },
            {
              title: tWords("domain"),
              description: DescriptionDomain(item?.domain ?? undefined),
            },
          ];
        }}
        dialogDescriptionWidth={800}
        returnItemListNode={LevelDomainList}
        getItemList={getLevelDomainList}
      />
    </>
  );
}
