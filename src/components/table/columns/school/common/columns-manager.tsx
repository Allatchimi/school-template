"use client";

import { TableColumnsProps } from "@/components/table/column.type";
import { TableColumnID } from "@/components/table/column/column-id";
import {
  TableColumnStringNumber,
  TableColumnObject,
} from "@/components/table/column/column-types";
import { TableColumnUpdatedAt } from "@/components/table/column/column-updated-at";
import { TableColumnSchool } from "@/components/table/column/school/column-school";
import TableIndexUser from "@/components/table/indexes/user/index-user";
import { ManagerResponse } from "@/lib/api/school/common/manager/response";
import { TableColumnsType } from "antd";
import { useTranslations } from "next-intl";

export function TableColumsManager(
  props: TableColumnsProps
): TableColumnsType<ManagerResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ManagerResponse>({ ...props }),
    ...TableColumnStringNumber<ManagerResponse>({
      ...props,
      title: tWords("uid"),
      dataIndex: "uid",
      key: "uid",
      sorter: true,
    }),
    ...TableColumnObject<ManagerResponse>({
      ...props,
      title: tWords("user"),
      render(record) {
        return <TableIndexUser record={record?.user ?? undefined} />;
      },
    }),
    ...TableColumnSchool<ManagerResponse>(props.schoolType),
    ...TableColumnUpdatedAt<ManagerResponse>({ ...props }),
  ];
}
