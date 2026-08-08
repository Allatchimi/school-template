"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ContactResponse } from "@/lib/api/others/contact/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionContact(
  item?: ContactResponse
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
      key: "email",
      label: tWords("email"),
      children: item?.email,
    },
    {
      key: "message",
      label: tWords("message"),
      children: item?.message,
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
