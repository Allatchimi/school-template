"use client";

import { LevelResponse } from "@/lib/api/school/university/level/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsLevel(
  props: TableColumnsProps
): TableColumnsType<LevelResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<LevelResponse>({ ...props }),
    ...TableColumnSchool<LevelResponse>(props.schoolType),
    ...TableColumnStringNumber<LevelResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<LevelResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<LevelResponse>({ ...props }),
  ];
}
