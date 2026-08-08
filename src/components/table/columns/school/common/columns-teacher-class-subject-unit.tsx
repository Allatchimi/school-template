"use client";

import { TeacherClassSubjectUnitResponse } from "@/lib/api/school/common/teacher/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnObject } from "@/components/table/column/column-types";
import { TableColumnYear } from "@/components/table/column/school/column-year";
import TableIndexTeacher from "@/components/table/indexes/school/common/index-teacher";
import { TableColumnClassSubjectUnit } from "@/components/table/column/school/column-class-subject-unit";
import { useTranslations } from "next-intl";

export function TableColumsTeacherClassSubjectUnit(
  props: TableColumnsProps
): TableColumnsType<TeacherClassSubjectUnitResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<TeacherClassSubjectUnitResponse>({ ...props }),
    ...TableColumnSchool<TeacherClassSubjectUnitResponse>(props.schoolType),
    ...TableColumnYear<TeacherClassSubjectUnitResponse>(props.yearID),
    ...TableColumnClassSubjectUnit<TeacherClassSubjectUnitResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnObject<TeacherClassSubjectUnitResponse>({
      ...props,
      title: tWords("teacher"),
      render(record) {
        return <TableIndexTeacher record={record?.teacher ?? undefined} />;
      },
    }),
    ...TableColumnUpdatedAt<TeacherClassSubjectUnitResponse>({ ...props }),
  ];
}
