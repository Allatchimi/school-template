"use client";

import { formatDate, formatDateTime } from "@/helpers/date/format";
import {
  UserResponse,
  UserInfoResponse,
  UserConfigResponse,
} from "@/lib/api/user/user/response";
import { DescriptionsProps } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function DescriptionUser(
  item?: UserResponse
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
      key: "loginMethod",
      label: tWords("loginMethod"),
      children: item?.loginMethod
        ? tEnums(`loginMethod.${item?.loginMethod}`)
        : "",
    },
    {
      key: "provider",
      label: tWords("provider"),
      children: item?.provider,
    },
    {
      key: "providerUserID",
      label: tWords("providerUserID"),
      children: item?.providerUserID,
    },
    {
      key: "status",
      label: tWords("status"),
      children: item?.status ? tEnums(`status.${item?.status}`) : "",
    },
    {
      key: "isActivated",
      label: tWords("isEmailVerified"),
      children: item?.isActivated === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "activatedAt",
      label: tWords("activatedAt"),
      children: formatDateTime(item?.activatedAt?.toString()),
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

export function DescriptionUserInfo(
  item?: UserInfoResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user");

  return [
    {
      key: "gender",
      label: tWords("gender"),
      children: tEnums(`gender.${item?.gender}`),
    },
    {
      key: "username",
      label: tWords("username"),
      children: item?.username,
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
      key: "birthday",
      label: tWords("birthday"),
      children: formatDate(item?.birthday?.toString()),
    },
    {
      key: "birthLocation",
      label: tWords("birthLocation"),
      children: item?.birthLocation,
    },
    {
      key: "address",
      label: tWords("address"),
      children: item?.address,
    },
    {
      key: "language",
      label: tWords("language"),
      children: tEnums(`language.${item?.language}`),
    },
    {
      key: "image",
      label: tWords("image"),
      children: (
        <Link href={item?.image ?? "/"} target="_blank">
          {item?.image}
        </Link>
      ),
    },
  ];
}

export function DescriptionUserConfig(
  item?: UserConfigResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    {
      key: "email",
      label: tWords("emailEnabled"),
      children: item?.mfaEmail === true ? tWords("yes") : tWords("no"),
    },
    {
      key: "authenticator",
      label: tWords("authenticatorEnabled"),
      children: item?.mfaAuthenticator === true ? tWords("yes") : tWords("no"),
    },
  ];
}
