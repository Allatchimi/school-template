"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ReportCorrespondenceResponse } from "@/lib/api/school/common/report/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionReportCorrespondence(
  item?: ReportCorrespondenceResponse
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
      key: "minimum",
      label: tWords("minimum"),
      children: item?.minimum,
    },
    {
      key: "maximum",
      label: tWords("maximum"),
      children: item?.maximum,
    },
    {
      key: "includeMinimum",
      label: tWords("includeMinimum"),
      children: item?.includeMinimum,
    },
    {
      key: "includeMaximum",
      label: tWords("includeMaximum"),
      children: item?.includeMaximum,
    },
    {
      key: "newScore",
      label: tWords("newScore"),
      children: item?.newScore,
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
