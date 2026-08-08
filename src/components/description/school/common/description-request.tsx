"use client";

import { formatDateTime } from "@/helpers/date/format";
import { RequestResponse } from "@/lib/api/school/common/request/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function DescriptionRequest(
  item?: RequestResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.request");

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
      key: "statusFeedback",
      label: tWords("statusFeedback"),
      children: item?.statusFeedback,
    },
    {
      key: "audience",
      label: tWords("audience"),
      children: item?.audience ? tEnums(`audience.${item?.audience}`) : "",
    },
    {
      key: "title",
      label: tWords("title"),
      children: item?.title,
    },
    {
      key: "message",
      label: tWords("message"),
      children: item?.message,
    },
    {
      key: "document1",
      label: tWords("documentCount", { count: 1 }),
      children: (
        <Link href={item?.document1 ?? "/"} target="_blank">
          {item?.document1}
        </Link>
      ),
    },
    {
      key: "document2",
      label: tWords("documentCount", { count: 2 }),
      children: (
        <Link href={item?.document2 ?? "/"} target="_blank">
          {item?.document2}
        </Link>
      ),
    },
    {
      key: "document3",
      label: tWords("documentCount", { count: 3 }),
      children: (
        <Link href={item?.document3 ?? "/"} target="_blank">
          {item?.document3}
        </Link>
      ),
    },
    {
      key: "document4",
      label: tWords("documentCount", { count: 4 }),
      children: (
        <Link href={item?.document4 ?? "/"} target="_blank">
          {item?.document4}
        </Link>
      ),
    },
    {
      key: "document5",
      label: tWords("documentCount", { count: 5 }),
      children: (
        <Link href={item?.document5 ?? "/"} target="_blank">
          {item?.document5}
        </Link>
      ),
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
