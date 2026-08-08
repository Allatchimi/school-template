"use client";

import { CourseResponse } from "@/lib/api/school/common/course/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsCourse(
  props: TableColumnsProps
): TableColumnsType<CourseResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<CourseResponse>({ ...props }),
    ...TableColumnSchool<CourseResponse>(props.schoolType),
    ...TableColumnYear<CourseResponse>(props.yearID),
    ...TableColumnClassSubjectUnit<CourseResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnClassLevelDomain<CourseResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
    }),
    ...TableColumnStringNumber<CourseResponse>({
      ...props,
      title: tWords("title"),
      dataIndex: "title",
      key: "title",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<CourseResponse>({ ...props }),
  ];
}
