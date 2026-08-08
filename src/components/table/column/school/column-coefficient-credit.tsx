"use client";

import {
  SCHOOL_TYPES,
  SCHOOL_TYPE_HIGHSCHOOL,
} from "@/lib/constants/school/common/school";
import { TableColumnsType } from "antd";
import { SortOrder } from "antd/es/table/interface";
import { defaultColumnProps } from "../../props/default-column-props";
import { useTranslations } from "next-intl";

export function TableColumnCoefficientCredit<T>(
  schoolType?: string,
  orderBy?: string,
  sort?: SortOrder
): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> =
    schoolType && SCHOOL_TYPES.includes(schoolType)
      ? [
          schoolType === SCHOOL_TYPE_HIGHSCHOOL
            ? {
                title: tWords("coefficient"),
                dataIndex: "coefficient",
                key: "coefficient",
                sortOrder: orderBy && orderBy === "coefficient" ? sort : null,
                ...defaultColumnProps,
              }
            : {
                title: tWords("credit"),
                dataIndex: "credit",
                key: "credit",
                sortOrder: orderBy && orderBy === "credit" ? sort : null,
                ...defaultColumnProps,
              },
        ]
      : [
          {
            title: tWords("coefficient"),
            dataIndex: "coefficient",
            key: "coefficient",
            sortOrder: orderBy && orderBy === "coefficient" ? sort : null,
            ...defaultColumnProps,
          },
          {
            title: tWords("credit"),
            dataIndex: "credit",
            key: "credit",
            sortOrder: orderBy && orderBy === "credit" ? sort : null,
            ...defaultColumnProps,
          },
        ];

  return columns;
}
