"use client";

import { ReportEntryResponse } from "@/lib/api/school/common/report/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import TableIndexStudent from "../../../indexes/school/common/index-student";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnBoolean,
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { TableColumnCoefficientCredit } from "@/components/table/column/school/column-coefficient-credit";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsReportEntry(
  props: TableColumnsProps
): TableColumnsType<ReportEntryResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ReportEntryResponse>({ ...props }),
    ...TableColumnSchool<ReportEntryResponse>(props.schoolType),
    ...TableColumnYear<ReportEntryResponse>(props.yearID),
    ...TableColumnClassSubjectUnit<ReportEntryResponse>({
      schoolType: props.schoolType,
      showSemester: true,
      showSequence: true,
    }),
    ...TableColumnClassLevelDomain<ReportEntryResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
    }),
    ...TableColumnObject<ReportEntryResponse>({
      ...props,
      title: tWords("student"),
      render(record) {
        return <TableIndexStudent record={record?.student ?? undefined} />;
      },
    }),
    ...TableColumnCoefficientCredit<ReportEntryResponse>(
      props.schoolType,
      props.orderBy,
      props.sort
    ),
    ...TableColumnStringNumber<ReportEntryResponse>({
      ...props,
      title: tWords("score"),
      dataIndex: "score",
      key: "score",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportEntryResponse>({
      ...props,
      title: tWords("notation"),
      dataIndex: "notation",
      key: "notation",
      sorter: true,
    }),
    ...TableColumnBoolean<ReportEntryResponse>({
      ...props,
      title: tWords("isRetry"),
      dataIndex: "isRetry",
      key: "is_retry",
      sorter: true,
    }),
    ...TableColumnStringNumber<ReportEntryResponse>({
      ...props,
      title: tWords("retryCount"),
      dataIndex: "retryCount",
      key: "retry_count",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ReportEntryResponse>({ ...props }),
  ];
}
