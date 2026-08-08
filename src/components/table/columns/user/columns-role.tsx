"use client";

import { TableColumnsType } from "antd";
import { RoleResponse } from "@/lib/api/user/role/response";
import { TableColumnsProps } from "../../column.type";
import { TableColumnID } from "../../column/column-id";
import { TableColumnUpdatedAt } from "../../column/column-updated-at";
import {
  TableColumnEnum,
  TableColumnStringNumber,
} from "../../column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsRole(
  props: TableColumnsProps
): TableColumnsType<RoleResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.permission.feature");

  return [
    ...TableColumnID<RoleResponse>({ ...props }),
    ...TableColumnEnum<RoleResponse>({
      ...props,
      title: tWords("feature"),
      dataIndex: "feature",
      key: "feature",
      sorter: true,
      render(value) {
        return value ? tEnums(`${value}`) : "";
      },
    }),
    ...TableColumnStringNumber<RoleResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<RoleResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<RoleResponse>({ ...props }),
  ];
}
