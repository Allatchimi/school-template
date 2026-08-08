"use client";

import UnitList from "@/components/card-list/school/university/unit-list";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { DescriptionSemester } from "@/components/description/school/university/description-semester";
import { DescriptionUnit } from "@/components/description/school/university/description-unit";
import {
  FilterSchoolYearStudentType,
  filterSchoolYearStudentTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student-multiple";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
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
        FilterSchoolYearStudentType
      >
        itemLabel={tWords("unit")}
        queryKeyData="student-units-data"
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
