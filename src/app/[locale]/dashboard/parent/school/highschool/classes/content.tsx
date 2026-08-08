"use client";

import ClassList from "@/components/card-list/school/highschool/class-list";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionSpecialty } from "@/components/description/school/highschool/description-specialty";
import {
  FilterSchoolYearStudentType,
  filterSchoolYearStudentTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student-multiple";
import ContentCardListTemplate from "@/components/template/content-card-list/content-card-list-template";
import { SchoolConfig } from "@/config/school";
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
        FilterSchoolYearStudentType
      >
        itemLabel={tWords("class")}
        queryKeyData="parent-classes-data"
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
