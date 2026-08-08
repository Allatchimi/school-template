"use client";

import TableIndexDomain from "@/components/table/indexes/school/university/index-domain";
import TableIndexLevel from "@/components/table/indexes/school/university/index-level";
import TableIndexSemester from "@/components/table/indexes/school/university/index-semester";
import { UnitResponse } from "@/lib/api/school/university/unit/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnID } from "../../../column/column-id";
import {
  TableColumnBoolean,
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsUnit(
  props: TableColumnsProps
): TableColumnsType<UnitResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<UnitResponse>({ ...props }),
    ...TableColumnSchool<UnitResponse>(props.schoolType),
    ...TableColumnStringNumber<UnitResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<UnitResponse>({
      ...props,
      title: tWords("credit"),
      dataIndex: "credit",
      key: "credit",
      sorter: true,
    }),
    ...TableColumnObject<UnitResponse>({
      ...props,
      title: tWords("level"),
      render(record) {
        return (
          <TableIndexLevel record={record?.levelDomain?.level ?? undefined} />
        );
      },
    }),
    ...TableColumnObject<UnitResponse>({
      ...props,
      title: tWords("domain"),
      render(record) {
        return (
          <TableIndexDomain record={record?.levelDomain?.domain ?? undefined} />
        );
      },
    }),
    ...TableColumnObject<UnitResponse>({
      ...props,
      title: tWords("semester"),
      render(record) {
        return <TableIndexSemester record={record?.semester ?? undefined} />;
      },
    }),
    ...TableColumnBoolean<UnitResponse>({
      ...props,
      title: tWords("isValid"),
      dataIndex: "isValid",
      key: "is_valid",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<UnitResponse>({ ...props }),
  ];
}
