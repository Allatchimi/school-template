"use client";

import TableIndexSchool from "@/components/table/indexes/school/common/index-school";
import { SCHOOL_TYPES } from "@/lib/constants/school/common/school";
import { TableColumnsType } from "antd";
import { TableColumnObject } from "../column-types";
import { useTranslations } from "next-intl";

export function TableColumnSchool<T extends object>(
  schoolType?: string
): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> =
    schoolType && SCHOOL_TYPES.includes(schoolType)
      ? []
      : [
          ...TableColumnObject<T>({
            title: tWords("school"),
            render(record) {
              return (
                <TableIndexSchool
                  record={(record as any)?.school ?? undefined}
                  showType={true}
                />
              );
            },
          }),
        ];

  return columns;
}
