"use client";

import { ReportGradeResponse } from "@/lib/api/school/common/report/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnBoolean,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsReportGrade(
  props: TableColumnsProps
): TableColumnsType<ReportGradeResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ReportGradeResponse>({ ...props }),
    ...TableColumnSchool<ReportGradeResponse>(props.schoolType),
    ...TableColumnStringNumber<ReportGradeResponse>({
      ...props,
      title: tWords("type"),
      dataIndex: "type",
      key: "type",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportGradeResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportGradeResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportGradeResponse>({
      ...props,
      title: tWords("minimum"),
      dataIndex: "minimum",
      key: "minimum",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportGradeResponse>({
      ...props,
      title: tWords("maximum"),
      dataIndex: "maximum",
      key: "maximum",
      sorter: true,
    }),
    ...TableColumnBoolean<ReportGradeResponse>({
      ...props,
      title: tWords("includeMinimum"),
      dataIndex: "includeMinimum",
      key: "include_minimum",
      sorter: true,
    }),
    ...TableColumnBoolean<ReportGradeResponse>({
      ...props,
      title: tWords("includeMaximum"),
      dataIndex: "includeMaximum",
      key: "include_maximum",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ReportGradeResponse>({ ...props }),
  ];
}
