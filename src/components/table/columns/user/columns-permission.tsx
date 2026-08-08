"use client";

import { TableColumnsType } from "antd";
import { PermissionResponse } from "@/lib/api/user/permission/response";
import TableIndexRole from "../../indexes/user/index-role";
import { TableColumnsProps } from "../../column.type";
import { TableColumnID } from "../../column/column-id";
import { TableColumnUpdatedAt } from "../../column/column-updated-at";
import {
  TableColumnBoolean,
  TableColumnEnum,
  TableColumnObject,
} from "../../column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsPermission(
  props: TableColumnsProps
): TableColumnsType<PermissionResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.permission.table");

  return [
    ...TableColumnID<PermissionResponse>({ ...props }),
    ...TableColumnObject<PermissionResponse>({
      ...props,
      title: tWords("role"),
      render(record) {
        return <TableIndexRole record={record?.role ?? undefined} />;
      },
    }),
    ...TableColumnEnum<PermissionResponse>({
      ...props,
      title: tWords("table"),
      dataIndex: "tableName",
      key: "table_name",
      sorter: true,
      render(value) {
        return value ? tEnums(`${value}`) : "";
      },
    }),
    ...TableColumnBoolean<PermissionResponse>({
      ...props,
      title: tWords("create"),
      dataIndex: "create",
      key: "create",
      sorter: true,
    }),
    ...TableColumnBoolean<PermissionResponse>({
      ...props,
      title: tWords("read"),
      dataIndex: "read",
      key: "read",
      sorter: true,
    }),
    ...TableColumnBoolean<PermissionResponse>({
      ...props,
      title: tWords("update"),
      dataIndex: "update",
      key: "update",
      sorter: true,
    }),
    ...TableColumnBoolean<PermissionResponse>({
      ...props,
      title: tWords("delete"),
      dataIndex: "delete",
      key: "delete",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<PermissionResponse>({ ...props }),
  ];
}
