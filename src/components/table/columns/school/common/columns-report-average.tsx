"use client";

import { ReportAverageResponse } from "@/lib/api/school/common/report/response";
import { TableColumnsType } from "antd";
import { TableColumnClassLevelDomain } from "../../../column/school/column-class-level-domain";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsReportAverage(
  props: TableColumnsProps
): TableColumnsType<ReportAverageResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ReportAverageResponse>({ ...props }),
    ...TableColumnSchool<ReportAverageResponse>(props.schoolType),
    ...TableColumnYear<ReportAverageResponse>(props.yearID),
    ...TableColumnClassLevelDomain<ReportAverageResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnStringNumber<ReportAverageResponse>({
      ...props,
      title: tWords("periodType"),
      dataIndex: "periodType",
      key: "period_type",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportAverageResponse>({
      ...props,
      title: tWords("periodName"),
      dataIndex: "periodName",
      key: "period_name",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportAverageResponse>({
      ...props,
      title: tWords("score"),
      dataIndex: "score",
      key: "score",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportAverageResponse>({
      ...props,
      title: tWords("notation"),
      dataIndex: "notation",
      key: "notation",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportAverageResponse>({
      ...props,
      title: tWords("grade"),
      dataIndex: "gradeName",
      key: "grade_name",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportAverageResponse>({
      ...props,
      title: tWords("isSuccessful"),
      dataIndex: "isSuccessful",
      key: "is_successful",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportAverageResponse>({
      ...props,
      title: tWords("rank"),
      dataIndex: "rank",
      key: "rank",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ReportAverageResponse>({ ...props }),
  ];
}
