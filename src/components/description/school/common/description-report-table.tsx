"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ReportTableResponse } from "@/lib/api/school/common/report/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionReportTable(
  item?: ReportTableResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.report");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "periodType",
      label: tWords("periodType"),
      children: item?.periodType
        ? tEnums(`periodType.${item?.periodType}`)
        : "",
    },
    {
      key: "periodName",
      label: tWords("periodName"),
      children: item?.periodName,
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
