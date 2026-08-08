"use client";

import { StudentResponse } from "@/lib/api/school/common/student/response";
import { TableColumnsType } from "antd";
import TableIndexUser from "../../../indexes/user/index-user";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsStudent(
  props: TableColumnsProps
): TableColumnsType<StudentResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<StudentResponse>({ ...props }),
    ...TableColumnStringNumber<StudentResponse>({
      ...props,
      title: tWords("uid"),
      dataIndex: "uid",
      key: "uid",
      sorter: true,
    }),
    ...TableColumnObject<StudentResponse>({
      ...props,
      title: tWords("user"),
      render(record) {
        return <TableIndexUser record={record?.user ?? undefined} />;
      },
    }),
    ...TableColumnSchool<StudentResponse>(props.schoolType),
    ...TableColumnUpdatedAt<StudentResponse>({ ...props }),
  ];
}
