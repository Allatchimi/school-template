"use client";

import TableIndexYear from "@/components/table/indexes/school/common/index-year";
import { IDType } from "@/types/http/base-response";
import { TableColumnsType } from "antd";
import { TableColumnObject } from "../column-types";
import { useTranslations } from "next-intl";

export function TableColumnYear<T extends object>(
  yearID?: IDType,
  isStudentEnroll?: boolean,
  isExam?: boolean
): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> =
    yearID && yearID > 0
      ? []
      : [
          ...TableColumnObject<T>({
            title: tWords("year"),
            render(record) {
              return (
                <TableIndexYear
                  record={
                    isStudentEnroll === true
                      ? (record as any)?.studentEnroll?.year || undefined
                      : isExam === true
                        ? (record as any)?.exam?.year || undefined
                        : (record as any)?.year || undefined
                  }
                />
              );
            },
          }),
        ];

  return columns;
}
