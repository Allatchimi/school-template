"use client";

import { ReportCorrespondenceResponse } from "@/lib/api/school/common/report/response";
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

export function TableColumsReportCorrespondence(
  props: TableColumnsProps
): TableColumnsType<ReportCorrespondenceResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ReportCorrespondenceResponse>({ ...props }),
    ...TableColumnSchool<ReportCorrespondenceResponse>(props.schoolType),
    ...TableColumnStringNumber<ReportCorrespondenceResponse>({
      ...props,
      title: tWords("minimum"),
      dataIndex: "minimum",
      key: "minimum",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportCorrespondenceResponse>({
      ...props,
      title: tWords("maximum"),
      dataIndex: "maximum",
      key: "maximum",
      sorter: true,
    }),
    ...TableColumnBoolean<ReportCorrespondenceResponse>({
      ...props,
      title: tWords("includeMinimum"),
      dataIndex: "includeMinimum",
      key: "include_minimum",
      sorter: true,
    }),
    ...TableColumnBoolean<ReportCorrespondenceResponse>({
      ...props,
      title: tWords("includeMaximum"),
      dataIndex: "includeMaximum",
      key: "include_maximum",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportCorrespondenceResponse>({
      ...props,
      title: tWords("newScore"),
      dataIndex: "newScore",
      key: "new_score",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ReportCorrespondenceResponse>({ ...props }),
  ];
}
