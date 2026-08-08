"use client";

import { ReportConfigResponse } from "@/lib/api/school/common/report/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsReportConfig(
  props: TableColumnsProps
): TableColumnsType<ReportConfigResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ReportConfigResponse>({ ...props }),
    ...TableColumnSchool<ReportConfigResponse>(props.schoolType),
    ...TableColumnStringNumber<ReportConfigResponse>({
      ...props,
      title: tWords("notationAverage"),
      dataIndex: "notationAverage",
      key: "notation_average",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportConfigResponse>({
      ...props,
      title: tWords("notationReport"),
      dataIndex: "notationReport",
      key: "notation_report",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportConfigResponse>({
      ...props,
      title: tWords("minimumRequiredScoreToPromote"),
      dataIndex: "minimumRequiredScoreToPromote",
      key: "minimum_required_score_to_promote",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ReportConfigResponse>({ ...props }),
  ];
}
