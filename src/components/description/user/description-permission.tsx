"use client";

import { formatDateTime } from "@/helpers/date/format";
import { PermissionResponse } from "@/lib/api/user/permission/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionPermission(
  item?: PermissionResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.permission.table");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "tableName",
      label: tWords("table"),
      children: item?.tableName ? tEnums(`${item?.tableName}`) : "",
    },
    {
      key: "create",
      label: tWords("create"),
      children: item?.create === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "read",
      label: tWords("read"),
      children: item?.read === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "update",
      label: tWords("update"),
      children: item?.update === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "delete",
      label: tWords("delete"),
      children: item?.delete === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "createdAt",
      label: tWords("createdAt"),
      children: formatDateTime(item?.createdAt?.toString()),
    },
    {
      key: "updatedAt",
      label: tWords("updatedAt"),
      children: formatDateTime(item?.updatedAt?.toString()),
    },
  ];
}
