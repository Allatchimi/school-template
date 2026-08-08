"use client";

import { formatDateTime } from "@/helpers/date/format";
import { StudentResponse } from "@/lib/api/school/common/student/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function DescriptionStudent(
  item?: StudentResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "uid",
      label: tWords("uid"),
      children: item?.uid,
    },
    {
      key: "firstName",
      label: tWords("firstName"),
      children: item?.user?.info?.firstName,
    },
    {
      key: "lastName",
      label: tWords("lastName"),
      children: item?.user?.info?.lastName,
    },
    {
      key: "email",
      label: tWords("email"),
      children: item?.user?.email,
    },
    {
      key: "phoneNumber",
      label: tWords("phoneNumber"),
      children: item?.user?.phoneNumber,
    },
    {
      key: "gender",
      label: tWords("gender"),
      children: item?.user?.info?.gender
        ? tEnums(`gender.${item?.user?.info?.gender}`)
        : "",
    },
    {
      key: "birthday",
      label: tWords("birthday"),
      children: formatDateTime(item?.user?.info?.birthday?.toString()),
    },
    {
      key: "birthLocation",
      label: tWords("birthLocation"),
      children: item?.user?.info?.birthLocation,
    },
    {
      key: "address",
      label: tWords("address"),
      children: item?.user?.info?.address,
    },
    {
      key: "language",
      label: tWords("language"),
      children: item?.user?.info?.language
        ? tEnums(`language.${item?.user?.info?.language}`)
        : "",
    },
    {
      key: "image",
      label: tWords("image"),
      children: (
        <Link href={item?.user?.info?.image ?? "/"} target="_blank">
          {item?.user?.info?.image}
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
