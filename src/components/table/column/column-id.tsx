"use client";

import { TableColumnsType } from "antd";
import { TableColumnsProps } from "../column.type";
import { TableColumnStringNumber } from "./column-types";
import { useTranslations } from "next-intl";

export function TableColumnID<T extends object>(
  props: TableColumnsProps
): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> = [
    ...TableColumnStringNumber<T>({
      ...props,
      title: tWords("id"),
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: true,
    }),
  ];

  return columns;
}
