"use client";

import { formatDateTime } from "@/helpers/date/format";
import { MeetingResponse } from "@/lib/api/school/common/meeting/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionMeeting(
  item?: MeetingResponse
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
      key: "apiRoomID",
      label: tWords("apiRoomID"),
      children: item?.apiRoomID,
    },
    {
      key: "isRunning",
      label: tWords("isRunning"),
      children: item?.isRunning === true ? tWords("yes") : tWords("no"),
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
