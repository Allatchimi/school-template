"use client";

import TableIndexDomain from "@/components/table/indexes/school/university/index-domain";
import TableIndexLevel from "@/components/table/indexes/school/university/index-level";
import { LevelDomainResponse } from "@/lib/api/school/university/level/response";
import { TableColumnsType } from "antd";
import { Text } from "@/ui/antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnBoolean,
  TableColumnObject,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsLevelDomain(
  props: TableColumnsProps
): TableColumnsType<LevelDomainResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<LevelDomainResponse>({ ...props }),
    ...TableColumnSchool<LevelDomainResponse>(props.schoolType),
    ...TableColumnObject<LevelDomainResponse>({
      ...props,
      title: tWords("level"),
      render(record) {
        return <TableIndexLevel record={record?.level ?? undefined} />;
      },
    }),
    ...TableColumnObject<LevelDomainResponse>({
      ...props,
      title: tWords("domain"),
      render(record) {
        return <TableIndexDomain record={record?.domain ?? undefined} />;
      },
    }),
    ...TableColumnObject<LevelDomainResponse>({
      ...props,
      title: tWords("fees"),
      key: "fees",
      sorter: true,
      render(record) {
        return (
          <Text
            ellipsis
          >{`${record?.fees || 0} ${record?.school?.currency?.toUpperCase() || ""}`}</Text>
        );
      },
    }),
    ...TableColumnBoolean<LevelDomainResponse>({
      ...props,
      title: tWords("isValid"),
      dataIndex: "isValid",
      key: "is_valid",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<LevelDomainResponse>({ ...props }),
  ];
}
