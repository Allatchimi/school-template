"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import { DescriptionsProps } from "antd";
import Link from "next/link";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export function DescriptionClass(
  item?: ClassResponse
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
      key: "fees",
      label: tWords("fees"),
      children: (
        <Text>
          {`${(item?.fees ?? 0) > 0 ? item?.fees : 0} ${
            (item?.school?.currency?.length ?? 0) > 0
              ? item?.school?.currency?.toUpperCase()
              : ""
          }`}
        </Text>
      ),
    },
    {
      key: "program",
      label: tWords("program"),
      children: (
        <Link href={item?.program ?? "/"} target="_blank">
          {item?.program}
        </Link>
      ),
    },
    {
      key: "requirements",
      label: tWords("requirements"),
      children: (
        <Link href={item?.requirements ?? "/"} target="_blank">
          {item?.requirements}
        </Link>
      ),
    },
    {
      key: "isValid",
      label: tWords("isValid"),
      children: item?.isValid === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "invalidDate",
      label: tWords("invalidatedDate"),
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
