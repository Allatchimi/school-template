"use client";

import TableIndexSection from "@/components/table/indexes/school/highschool/index-section";
import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsSpecialty(
  props: TableColumnsProps
): TableColumnsType<SpecialtyResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<SpecialtyResponse>({ ...props }),
    ...TableColumnSchool<SpecialtyResponse>(props.schoolType),
    ...TableColumnObject<SpecialtyResponse>({
      ...props,
      title: tWords("section"),
      render(record) {
        return <TableIndexSection record={record?.section ?? undefined} />;
      },
    }),
    ...TableColumnStringNumber<SpecialtyResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<SpecialtyResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<SpecialtyResponse>({ ...props }),
  ];
}
