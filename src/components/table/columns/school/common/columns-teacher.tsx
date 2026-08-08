"use client";

import { TeacherResponse } from "@/lib/api/school/common/teacher/response";
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

export function TableColumsTeacher(
  props: TableColumnsProps
): TableColumnsType<TeacherResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<TeacherResponse>({ ...props }),
    ...TableColumnStringNumber<TeacherResponse>({
      ...props,
      title: tWords("uid"),
      dataIndex: "uid",
      key: "uid",
      sorter: true,
    }),
    ...TableColumnObject<TeacherResponse>({
      ...props,
      title: tWords("user"),
      render(record) {
        return <TableIndexUser record={record?.user ?? undefined} />;
      },
    }),
    ...TableColumnSchool<TeacherResponse>(props.schoolType),
    ...TableColumnUpdatedAt<TeacherResponse>({ ...props }),
  ];
}
