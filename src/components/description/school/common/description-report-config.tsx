"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ReportConfigResponse } from "@/lib/api/school/common/report/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionReportConfig(
  item?: ReportConfigResponse
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
      key: "notationAverage",
      label: tWords("notationAverage"),
      children: item?.notationAverage,
    },
    {
      key: "notationReport",
      label: tWords("notationReport"),
      children: item?.notationReport,
    },
    {
      key: "minimumRequiredScoreToPromote",
      label: tWords("minimumRequiredScoreToPromote"),
      children: item?.minimumRequiredScoreToPromote,
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
