"use client";

import { formatDateTime } from "@/helpers/date/format";
import { StudentPreEnrollResponse } from "@/lib/api/school/common/student/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionStudentPreEnroll(
  item?: StudentPreEnrollResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnumsUser = useTranslations("Enums.user");
  const tEnumsStudent = useTranslations("Enums.school.common.student");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "status",
      label: tWords("status"),
      children: item?.status
        ? tEnumsStudent(`preEnrollStatus.${item?.status}`)
        : "",
    },
    {
      key: "firstName",
      label: tWords("firstName"),
      children: item?.firstName,
    },
    {
      key: "lastName",
      label: tWords("lastName"),
      children: item?.lastName,
    },
    {
      key: "email",
      label: tWords("email"),
      children: item?.email,
    },
    {
      key: "phoneNumber",
      label: tWords("phoneNumber"),
      children: item?.phoneNumber,
    },
    {
      key: "gender",
      label: tWords("gender"),
      children: item?.gender ? tEnumsUser(`gender.${item?.gender}`) : "",
    },
    {
      key: "birthday",
      label: tWords("birthday"),
      children: formatDateTime(item?.birthday?.toString()),
    },
    {
      key: "birthLocation",
      label: tWords("birthLocation"),
      children: item?.birthLocation,
    },
    {
      key: "message",
      label: tWords("message"),
      children: item?.message,
    },
    {
      key: "document1",
      label: tWords("documentCount", { count: 1 }),
      children: item?.document1,
    },
    {
      key: "document2",
      label: tWords("documentCount", { count: 2 }),
      children: item?.document2,
    },
    {
      key: "document3",
      label: tWords("documentCount", { count: 3 }),
      children: item?.document3,
    },
    {
      key: "document4",
      label: tWords("documentCount", { count: 4 }),
      children: item?.document4,
    },
    {
      key: "document5",
      label: tWords("documentCount", { count: 5 }),
      children: item?.document5,
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
