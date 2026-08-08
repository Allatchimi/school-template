"use client";

import { formatDateTime } from "@/helpers/date/format";
import { RoleResponse } from "@/lib/api/user/role/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionRole(
  item?: RoleResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "name",
      label: tWords("name"),
      children: item?.name,
    },
    {
      key: "feature",
      label: tWords("feature"),
      children: item?.feature ? tWords(item?.feature) : "",
    },
    {
      key: "description",
      label: tWords("description"),
      children: item?.description,
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
