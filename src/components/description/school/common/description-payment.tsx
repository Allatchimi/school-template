"use client";

import { formatDateTime } from "@/helpers/date/format";
import { PaymentEnrollResponse } from "@/lib/api/school/common/payment/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionPayment(
  item?: PaymentEnrollResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.payment");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "amount",
      label: tWords("amount"),
      children: item?.amount,
    },
    {
      key: "currency",
      label: tWords("currency"),
      children: item?.currency,
    },
    {
      key: "date",
      label: tWords("date"),
      children: formatDateTime(item?.date?.toString()),
    },
    {
      key: "method",
      label: tWords("method"),
      children: item?.method ? tEnums(`method.${item?.method}`) : "",
    },
    {
      key: "status",
      label: tWords("status"),
      children: item?.status ? tEnums(`status.${item?.status}`) : "",
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
