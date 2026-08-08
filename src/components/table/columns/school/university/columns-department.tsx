"use client";

import TableIndexFaculty from "@/components/table/indexes/school/university/index-faculty";
import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsDepartment(
  props: TableColumnsProps
): TableColumnsType<DepartmentResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<DepartmentResponse>({ ...props }),
    ...TableColumnSchool<DepartmentResponse>(props.schoolType),
    ...TableColumnObject<DepartmentResponse>({
      ...props,
      title: tWords("faculty"),
      render(record) {
        return <TableIndexFaculty record={record?.faculty ?? undefined} />;
      },
    }),
    ...TableColumnStringNumber<DepartmentResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<DepartmentResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<DepartmentResponse>({ ...props }),
  ];
}
