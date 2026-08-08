"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ClassSubjectResponse } from "@/lib/api/school/highschool/class/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function DescriptionClassSubject(
  item?: ClassSubjectResponse
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
      label: tWords("id"),
      children: item?.subject?.name,
    },
    {
      key: "subjectDescription",
      label: tWords("subjectDescription"),
      children: item?.subject?.description,
    },
    {
      key: "class",
      label: tWords("class"),
      children: item?.class?.name,
    },
    {
      key: "classDescription",
      label: tWords("classDescription"),
      children: item?.class?.description,
    },
    {
      key: "coefficient",
      label: tWords("coefficient"),
      children: item?.coefficient,
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
