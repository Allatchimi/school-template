"use client";

import { formatDateTime } from "@/helpers/date/format";
import { CommunicationResponse } from "@/lib/api/others/communication/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionCommunication(
  item?: CommunicationResponse
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
      key: "subject",
      label: tWords("topic"),
      children: item?.subject,
    },
    {
      key: "message",
      label: tWords("message"),
      children: item?.message,
    },
    {
      key: "audience",
      label: tWords("audience"),
      children: item?.role?.name,
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
