"use client";

import { SemesterResponse } from "@/lib/api/school/university/semester/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsSemester(
  props: TableColumnsProps
): TableColumnsType<SemesterResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<SemesterResponse>({ ...props }),
    ...TableColumnSchool<SemesterResponse>(props.schoolType),
    ...TableColumnStringNumber<SemesterResponse>({
      ...props,
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<SemesterResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<SemesterResponse>({ ...props }),
  ];
}
