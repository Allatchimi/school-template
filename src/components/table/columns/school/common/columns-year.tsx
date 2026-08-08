"use client";

import { YearResponse } from "@/lib/api/school/common/year/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnDate,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { formatDate } from "@/helpers/date/format";
import { useTranslations } from "next-intl";

export function TableColumsYear(
  props: TableColumnsProps
): TableColumnsType<YearResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<YearResponse>({ ...props }),
    ...TableColumnSchool<YearResponse>(props.schoolType),
    ...TableColumnStringNumber<YearResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnDate<YearResponse>({
      ...props,
      title: tWords("startDate"),
      dataIndex: "startDate",
      key: "start_date",
      sorter: true,
      renderDateFormat(record) {
        return formatDate(record?.startDate?.toString());
      },
    }),
    ...TableColumnDate<YearResponse>({
      ...props,
      title: tWords("endDate"),
      dataIndex: "endDate",
      key: "end_date",
      sorter: true,
      renderDateFormat(record) {
        return formatDate(record?.endDate?.toString());
      },
    }),
    ...TableColumnUpdatedAt<YearResponse>({ ...props }),
  ];
}
