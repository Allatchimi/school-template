"use client";

import { formatDateTime } from "@/helpers/date/format";
import { StudentEnrollResponse } from "@/lib/api/school/common/student/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";

export function DescriptionStudentEnroll(
  item?: StudentEnrollResponse
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
      key: "origin",
      label: tWords("origin"),
      children: item?.origin
        ? tEnumsStudent(`enrollOrigin.${item?.origin}`)
        : "",
    },
    {
      key: "uid",
      label: tWords("uid"),
      children: item?.student?.uid,
    },
    {
      key: "firstName",
      label: tWords("firstName"),
      children: item?.student?.user?.info?.firstName,
    },
    {
      key: "lastName",
      label: tWords("lastName"),
      children: item?.student?.user?.info?.lastName,
    },
    {
      key: "email",
      label: tWords("email"),
      children: item?.student?.user?.email,
    },
    {
      key: "phoneNumber",
      label: tWords("phoneNumber"),
      children: item?.student?.user?.phoneNumber,
    },
    {
      key: "gender",
      label: tWords("gender"),
      children: item?.student?.user?.info?.gender
        ? tEnumsUser(`gender.${item?.student?.user?.info?.gender}`)
        : "",
    },
    {
      key: "birthday",
      label: tWords("birthday"),
      children: formatDateTime(item?.student?.user?.info?.birthday?.toString()),
    },
    {
      key: "birthLocation",
      label: tWords("birthLocation"),
      children: item?.student?.user?.info?.birthLocation,
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
