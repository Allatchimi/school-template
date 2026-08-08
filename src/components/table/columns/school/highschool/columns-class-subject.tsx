"use client";

import TableIndexClass from "@/components/table/indexes/school/highschool/index-class";
import TableIndexSubject from "@/components/table/indexes/school/highschool/index-subject";
import { ClassSubjectResponse } from "@/lib/api/school/highschool/class/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnBoolean,
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsClassSubject(
  props: TableColumnsProps
): TableColumnsType<ClassSubjectResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ClassSubjectResponse>({ ...props }),
    ...TableColumnSchool<ClassSubjectResponse>(props.schoolType),
    ...TableColumnObject<ClassSubjectResponse>({
      ...props,
      title: tWords("subject"),
      render(record) {
        return <TableIndexSubject record={record?.subject ?? undefined} />;
      },
    }),
    ...TableColumnObject<ClassSubjectResponse>({
      ...props,
      title: tWords("class"),
      render(record) {
        return <TableIndexClass record={record?.class ?? undefined} />;
      },
    }),
    ...TableColumnStringNumber<ClassSubjectResponse>({
      ...props,
      title: tWords("coefficient"),
      dataIndex: "coefficient",
      key: "coefficient",
      sorter: true,
    }),
    ...TableColumnBoolean<ClassSubjectResponse>({
      ...props,
      title: tWords("isValid"),
      dataIndex: "isValid",
      key: "is_valid",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ClassSubjectResponse>({ ...props }),
  ];
}
