"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ReportGradeResponse } from "@/lib/api/school/common/report/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionReportGrade(
  item?: ReportGradeResponse
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
      key: "type",
      label: tWords("type"),
      children: item?.type ? tEnums(`type.${item?.type}`) : "",
    },
    {
      key: "name",
      label: tWords("name"),
      children: item?.name,
    },
    {
      key: "description",
      label: tWords("description"),
      children: item?.description,
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
