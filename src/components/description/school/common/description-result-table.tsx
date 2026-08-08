"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ResultTableResponse } from "@/lib/api/school/common/result/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionResultTable(
  item?: ResultTableResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.result");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "status",
      label: tWords("status"),
      children: item?.status ? tEnums(`status.${item?.status}`) : "",
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
