"use client";

import UnitList from "@/components/card-list/school/university/unit-list";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { DescriptionSemester } from "@/components/description/school/university/description-semester";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolType,
  filterSchoolTypeTemplate,
} from "@/components/filter/default-filters";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import {
  UnitRequest,
  UnitListRequest,
} from "@/lib/api/school/university/unit/request";
import {
  UnitResponse,
  UnitListResponse,
} from "@/lib/api/school/university/unit/response";
import { getUnitList } from "@/lib/api/school/university/unit/routes";
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
      value: "credit",
      label: tWords("credit"),
    },
  ];
  return (
    <>
      <ContentCardListTemplate<
        UnitRequest,
        UnitResponse,
        UnitListRequest,
        UnitListResponse,
        FilterSchoolType
      >
        itemLabel={tWords("unit")}
        queryKeyData="teacher-units-data"
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolTypeTemplate}
        returnDescriptionsNode={(item) => {
          return [
            { description: DescriptionUnit(item) },
            {
              title: tWords("levelDomain"),
              description: DescriptionLevelDomain(
                item?.levelDomain ?? undefined
              ),
            },
            {
              title: tWords("semester"),
              description: DescriptionSemester(item?.semester ?? undefined),
            },
          ];
        }}
        dialogDescriptionWidth={800}
        returnItemListNode={UnitList}
        getItemList={getUnitList}
      />
    </>
  );
}
