"use client";

import { formatDateTime } from "@/helpers/date/format";
import { YearResponse } from "@/lib/api/school/common/year/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionYear(
  item?: YearResponse
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
      key: "startDate",
      label: tWords("startDate"),
      children: formatDateTime(item?.startDate?.toString()),
    },
    {
      key: "endDate",
      label: tWords("endDate"),
      children: formatDateTime(item?.endDate?.toString()),
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
