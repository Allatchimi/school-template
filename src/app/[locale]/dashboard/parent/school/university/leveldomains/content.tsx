"use client";

import LevelDomainList from "@/components/card-list/school/university/level-domain-list";
import { DescriptionDomain } from "@/components/description/school/university/description-domain";
import { DescriptionLevel } from "@/components/description/school/university/description-level";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolYearStudentType,
  filterSchoolYearStudentTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student-multiple";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
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
        FilterSchoolYearStudentType
      >
        itemLabel={tWords("levelDomain")}
        queryKeyData="student-level-domains-data"
        filterOrderByList={orderByList}
        filterTemplate={filterSchoolYearStudentTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              <FormItemSelectStudent
                disabled={loading}
                defaultValue={values?.studentID?.toString()}
                request={{
                  schoolID: SchoolConfig?.schoolID(),
                }}
                allowEmptySelection={true}
                allowEmptySelectionLabel="*"
                noMargin={true}
              />
            </div>
          );
        }}
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
