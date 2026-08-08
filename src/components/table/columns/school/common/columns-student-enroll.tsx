"use client";

import { StudentEnrollResponse } from "@/lib/api/school/common/student/response";
import { TableColumnsType } from "antd";
import { TableColumnClassLevelDomain } from "../../../column/school/column-class-level-domain";
import TableIndexStudentEnroll from "../../../indexes/school/common/index-student-enroll";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsStudentEnroll(
  props: TableColumnsProps
): TableColumnsType<StudentEnrollResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<StudentEnrollResponse>({ ...props }),
    ...TableColumnObject<StudentEnrollResponse>({
      ...props,
      title: tWords("student"),
      render(record) {
        return <TableIndexStudentEnroll record={record} />;
      },
    }),
    ...TableColumnSchool<StudentEnrollResponse>(props.schoolType),
    ...TableColumnYear<StudentEnrollResponse>(props.yearID),
    ...TableColumnClassLevelDomain<StudentEnrollResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnStringNumber<StudentEnrollResponse>({
      ...props,
      title: tWords("origin"),
      dataIndex: "origin",
      key: "origin",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<StudentEnrollResponse>({ ...props }),
  ];
}
