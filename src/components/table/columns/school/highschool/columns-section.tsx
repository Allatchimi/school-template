"use client";

import { SectionResponse } from "@/lib/api/school/highschool/section/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsSection(
  props: TableColumnsProps
): TableColumnsType<SectionResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<SectionResponse>({ ...props }),
    ...TableColumnSchool<SectionResponse>(props.schoolType),
    ...TableColumnStringNumber<SectionResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<SectionResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<SectionResponse>({ ...props }),
  ];
}
