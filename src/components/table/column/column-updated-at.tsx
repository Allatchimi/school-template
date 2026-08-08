"use client";

import { TableColumnsType } from "antd";
import { TableColumnsProps } from "../column.type";
import { TableColumnDate } from "./column-types";
import { formatDateTimeToSince } from "@/helpers/date/format";
import { useTranslations } from "next-intl";

export function TableColumnUpdatedAt<T extends object>(
  props: TableColumnsProps
): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> = [
    ...TableColumnDate<T>({
      ...props,
      title: tWords("updatedAt"),
      dataIndex: "updatedAt",
      key: "updated_at",
      sorter: true,
      renderDateFormat(record) {
        return formatDateTimeToSince((record as any)?.updatedAt?.toString());
      },
    }),
  ];

  return columns;
}
