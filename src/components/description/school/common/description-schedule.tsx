"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ScheduleResponse } from "@/lib/api/school/common/schedule/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionSchedule(
  item?: ScheduleResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.schedule");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "isCommon",
      label: tWords("isCommon"),
      children: item?.isCommon === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "type",
      label: tWords("type"),
      children: item?.type ? tEnums(`type.${item?.type}`) : "",
    },
    {
      key: "description",
      label: tWords("description"),
      children: item?.description,
    },
    {
      key: "dayOfTheWeek",
      label: tWords("dayOfTheWeek"),
      children: item?.dayOfTheWeek
        ? tEnums(`dayOfTheWeek.${item?.dayOfTheWeek}`)
        : "",
    },
    {
      key: "repeatCount",
      label: tWords("repeatCount"),
      children: item?.repeatCount,
    },
    {
      key: "repeatType",
      label: tWords("repeatType"),
      children: item?.repeatType
        ? tEnums(`repeatType.${item?.repeatType}`)
        : "",
    },
    {
      key: "startTime",
      label: tWords("startTime"),
      children: item?.startTime?.toString(),
    },
    {
      key: "endTime",
      label: tWords("endTime"),
      children: item?.endTime?.toString(),
    },
    {
      key: "startCountDate",
      label: tWords("startCountDate"),
      children: formatDateTime(item?.startCountDate?.toString()),
    },
    {
      key: "isValid",
      label: tWords("isValid"),
      children: item?.isValid === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "invalidDate",
      label: tWords("invalidDate"),
      children: formatDateTime(item?.invalidDate?.toString()),
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
