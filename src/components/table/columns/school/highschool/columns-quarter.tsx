"use client";

import { QuarterResponse } from "@/lib/api/school/highschool/quarter/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsQuarter(
  props: TableColumnsProps
): TableColumnsType<QuarterResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<QuarterResponse>({ ...props }),
    ...TableColumnSchool<QuarterResponse>(props.schoolType),
    ...TableColumnStringNumber<QuarterResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<QuarterResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<QuarterResponse>({ ...props }),
  ];
}
