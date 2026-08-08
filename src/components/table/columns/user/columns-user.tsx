"use client";

import { UserResponse } from "@/lib/api/user/user/response";
import TableIndexUser from "../../indexes/user/index-user";
import TableIndexRole from "../../indexes/user/index-role";
import { TableColumnSchool } from "../../column/school/column-school";
import { TableColumnsProps } from "../../column.type";
import { TableColumnUpdatedAt } from "../../column/column-updated-at";
import { TableColumnID } from "../../column/column-id";
import {
  TableColumnBoolean,
  TableColumnObject,
  TableColumnStatus,
  TableColumnStringNumber,
} from "../../column/column-types";
import { USER_STATUS_ENABLED } from "@/lib/constants/user/user";
import { TableColumnsType } from "antd/es";
import { useTranslations } from "next-intl";

export function TableColumsUser(
  props: TableColumnsProps
): TableColumnsType<UserResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.status");

  return [
    ...TableColumnID<UserResponse>({ ...props }),
    ...TableColumnSchool<UserResponse>(props.schoolType),
    ...TableColumnObject<UserResponse>({
      ...props,
      title: tWords("fullName"),
      render(record) {
        return <TableIndexUser record={record ?? undefined} />;
      },
    }),
    ...TableColumnStringNumber<UserResponse>({
      ...props,
      title: tWords("email"),
      dataIndex: "email",
      key: "email",
      sorter: true,
    }),
    ...TableColumnObject<UserResponse>({
      ...props,
      title: tWords("role"),
      render(record) {
        return <TableIndexRole record={record?.role ?? undefined} />;
      },
    }),
    ...TableColumnBoolean<UserResponse>({
      ...props,
      title: tWords("isActivated"),
      dataIndex: "isActivated",
      key: "is_activated",
      sorter: true,
    }),
    ...TableColumnStatus<UserResponse>({
      ...props,
      sorter: true,
      render(record) {
        return record?.status ? tEnums(record?.status) : record?.status;
      },
      renderColor(record) {
        return record?.status === USER_STATUS_ENABLED ? "success" : "error";
      },
    }),
    ...TableColumnUpdatedAt<UserResponse>({ ...props }),
  ];
}
