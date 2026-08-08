"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ResultResponse } from "@/lib/api/school/common/result/response";
import { DescriptionsProps } from "antd";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export function DescriptionResult(
  item?: ResultResponse
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
      key: "score",
      label: tWords("score"),
      children: (
        <Text>
          {item?.score}/
          {(item?.exam?.notation ?? 0) > 0 ? item?.exam?.notation : 0}
        </Text>
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
