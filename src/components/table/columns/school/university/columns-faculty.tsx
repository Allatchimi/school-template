"use client";

import { FacultyResponse } from "@/lib/api/school/university/faculty/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsFaculty(
  props: TableColumnsProps
): TableColumnsType<FacultyResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<FacultyResponse>({ ...props }),
    ...TableColumnSchool<FacultyResponse>(props.schoolType),
    ...TableColumnStringNumber<FacultyResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<FacultyResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<FacultyResponse>({ ...props }),
  ];
}
