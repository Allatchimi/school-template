"use client";

import { formatDateTime } from "@/helpers/date/format";
import { ReportEntryResponse } from "@/lib/api/school/common/report/response";
import { DescriptionsProps } from "antd";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";

export function DescriptionReportEntry(
  item?: ReportEntryResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    ...(item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
      ? [
          {
            key: "coefficient",
            label: tWords("coefficient"),
            children: item?.coefficient,
          },
        ]
      : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
        ? [
            {
              key: "credit",
              label: tWords("credit"),
              children: item?.credit,
            },
          ]
        : [
            {
              key: "coefficientCredit",
              label: tWords("coefficientCredit"),
              children: "",
            },
          ]),
    {
      key: "score",
      label: tWords("score"),
      children: item?.score,
    },
    {
      key: "notation",
      label: tWords("notation"),
      children: item?.notation,
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
      key: "retryDetails",
      label: tWords("retryDetails"),
      children: item?.retryDetails,
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
