"use client";

import { ReportTableResponse } from "@/lib/api/school/common/report/response";
import { TableColumnsType } from "antd";
import { TableColumnClassLevelDomain } from "../../../column/school/column-class-level-domain";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnStatus,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { REPORT_TABLE_STATUS_PUBLISHED } from "@/lib/constants/school/common/report";
import { useTranslations } from "next-intl";

export function TableColumsReportTable(
  props: TableColumnsProps
): TableColumnsType<ReportTableResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.report.status");

  return [
    ...TableColumnID<ReportTableResponse>({ ...props }),
    ...TableColumnSchool<ReportTableResponse>(props.schoolType),
    ...TableColumnYear<ReportTableResponse>(props.yearID),
    ...TableColumnClassLevelDomain<ReportTableResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnStringNumber<ReportTableResponse>({
      ...props,
      title: tWords("periodType"),
      dataIndex: "periodType",
      key: "period_type",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportTableResponse>({
      ...props,
      title: tWords("periodName"),
      dataIndex: "periodName",
      key: "period_name",
      sorter: true,
    }),
    ...TableColumnStatus<ReportTableResponse>({
      ...props,
      sorter: true,
      render(record) {
        return record?.status ? tEnums(record?.status) : "";
      },
      renderColor(record) {
        return record?.status === REPORT_TABLE_STATUS_PUBLISHED
          ? "success"
          : "default";
      },
    }),
    ...TableColumnStringNumber<ReportTableResponse>({
      ...props,
      title: tWords("notation"),
      dataIndex: "notation",
      key: "notation",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportTableResponse>({
      ...props,
      title: tWords("minimumRequiredScoreToPromote"),
      dataIndex: "minimumRequiredScoreToPromote",
      key: "minimum_required_score_to_promote",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportTableResponse>({
      ...props,
      title: tWords("grade"),
      dataIndex: "gradeName",
      key: "grade_name",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ReportTableResponse>({ ...props }),
  ];
}
