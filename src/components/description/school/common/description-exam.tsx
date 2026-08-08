"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ExamResponse } from "@/lib/api/school/common/exam/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionExam(
  item?: ExamResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.exam");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "type",
      label: tWords("type"),
      children: item?.type?.name,
    },
    {
      key: "typeDescription",
      label: tWords("typeDescription"),
      children: item?.type?.description,
    },
    {
      key: "status",
      label: tWords("status"),
      children: item?.status ? tEnums(`status.${item?.status}`) : "",
    },
    {
      key: "notation",
      label: tWords("notation"),
      children: item?.notation,
    },
    {
      key: "percentage",
      label: tWords("percentage"),
      children: `${item?.percentage ? item?.percentage : 100}%`,
    },
    {
      key: "description",
      label: tWords("description"),
      children: item?.description,
    },
    {
      key: "locationType",
      label: tWords("locationType"),
      children: item?.locationType
        ? tEnums(`locationType.${item?.locationType}`)
        : "",
    },
    {
      key: "locationDetails",
      label: tWords("locationDetails"),
      children: item?.locationDetails,
    },
    {
      key: "requirements",
      label: tWords("requirements"),
      children: item?.requirements,
    },
    {
      key: "allowedItems",
      label: tWords("allowedItems"),
      children: item?.allowedItems,
    },
    {
      key: "isRetry",
      label: tWords("isRetry"),
      children: item?.isRetry === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "retryCount",
      label: tWords("retryCount"),
      children: item?.retryCount,
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
