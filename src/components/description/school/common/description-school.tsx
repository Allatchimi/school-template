"use client";

import { formatDateTime } from "@/helpers/date/format";
import {
  SchoolResponse,
  SchoolInfoResponse,
  SchoolConfigResponse,
} from "@/lib/api/school/common/school/response";
import { COLOR_SCHEME } from "@/lib/constants/others/color";
import { DescriptionsProps } from "antd";
import Link from "next/link";
import { Text } from "@/ui/antd";
import { base64ToUtf8 } from "@/helpers/security/base64";
import { useTranslations } from "next-intl";

export function DescriptionSchool(
  item?: SchoolResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school");

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
      key: "type",
      label: tWords("type"),
      children: item?.type ? tEnums(`type.${item?.type}`) : "",
    },
    {
      key: "status",
      label: tWords("status"),
      children: item?.status ? tEnums(`status.${item?.status}`) : "",
    },
    {
      key: "deploymentRequest",
      label: tWords("deploymentRequest"),
      children: item?.deploymentRequest
        ? tEnums(`deploymentRequest.${item?.deploymentRequest}`)
        : "",
    },
    {
      key: "deploymentStatus",
      label: tWords("deploymentStatus"),
      children: item?.deploymentStatus
        ? tEnums(`deploymentStatus.${item?.deploymentStatus}`)
        : "",
    },
    {
      key: "deploymentFeedback",
      label: tWords("deploymentFeedback"),
      children: (
        <div className="text-base">
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {item?.deploymentFeedback}
          </pre>
        </div>
      ),
    },
    {
      key: "deploymentExtra",
      label: tWords("deploymentExtra"),
      children: (
        <div className="text-base">
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {getDeploymentInformationFromBase64(
              item?.deploymentExtra ?? undefined
            )}
          </pre>
        </div>
      ),
    },
    {
      key: "deploymentVersion",
      label: tWords("deploymentVersion"),
      children: item?.deploymentVersion,
    },
    {
      key: "favicon",
      label: tWords("favicon"),
      children: (
        <Link href={item?.favicon ?? "/"} target="_blank">
          {item?.favicon}
        </Link>
      ),
    },
    {
      key: "logo",
      label: tWords("logo"),
      children: (
        <Link href={item?.logo ?? "/"} target="_blank">
          {item?.logo}
        </Link>
      ),
    },
    {
      key: "logoWhite",
      label: tWords("logoWhite"),
      children: (
        <Link href={item?.logoWhite ?? "/"} target="_blank">
          {item?.logoWhite}
        </Link>
      ),
    },
    {
      key: "currency",
      label: tWords("currency"),
      children: item?.currency?.toUpperCase(),
    },
    {
      key: "paymentCount",
      label: tWords("paymentCount"),
      children: item?.paymentCount,
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

export function DescriptionSchoolInfo(
  item?: SchoolInfoResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    {
      key: "fullName",
      label: tWords("fullName"),
      children: item?.fullName,
    },
    {
      key: "description",
      label: tWords("description"),
      children: item?.description,
    },
    {
      key: "motto",
      label: tWords("motto"),
      children: item?.motto,
    },
    {
      key: "phoneNumber1",
      label: tWords("phoneNumberCount", { count: 1 }),
      children: item?.phoneNumber1,
    },
    {
      key: "phoneNumber2",
      label: tWords("phoneNumberCount", { count: 2 }),
      children: item?.phoneNumber2,
    },
    {
      key: "phoneNumber3",
      label: tWords("phoneNumberCount", { count: 3 }),
      children: item?.phoneNumber3,
    },
    {
      key: "email1",
      label: tWords("emailCount", { count: 1 }),
      children: item?.email1,
    },
    {
      key: "email2",
      label: tWords("emailCount", { count: 2 }),
      children: item?.email2,
    },
    {
      key: "email3",
      label: tWords("emailCount", { count: 3 }),
      children: item?.email3,
    },
    {
      key: "founder",
      label: tWords("founder"),
      children: item?.founder,
    },
    {
      key: "foundedAt",
      label: tWords("foundedAt"),
      children: formatDateTime(item?.foundedAt?.toString()),
    },
    {
      key: "address",
      label: tWords("address"),
      children: item?.address,
    },
    {
      key: "locationLongitude",
      label: tWords("locationLongitude"),
      children: item?.locationLongitude,
    },
    {
      key: "locationLatitude",
      label: tWords("locationLatitude"),
      children: item?.locationLatitude,
    },
    {
      key: "socialMediaTelegram",
      label: tWords("socialMediaTelegram"),
      children: (
        <Link href={item?.socialMediaTelegram ?? "/"} target="_blank">
          {item?.socialMediaTelegram}
        </Link>
      ),
    },
    {
      key: "socialMediaWhasapp",
      label: tWords("socialMediaWhasapp"),
      children: (
        <Link href={item?.socialMediaWhasapp ?? "/"} target="_blank">
          {item?.socialMediaWhasapp}
        </Link>
      ),
    },
    {
      key: "socialMediaYoutube",
      label: tWords("socialMediaYoutube"),
      children: (
        <Link href={item?.socialMediaYoutube ?? "/"} target="_blank">
          {item?.socialMediaYoutube}
        </Link>
      ),
    },
    {
      key: "socialMediaTwitter",
      label: tWords("socialMediaTwitter"),
      children: (
        <Link href={item?.socialMediaTwitter ?? "/"} target="_blank">
          {item?.socialMediaTwitter}
        </Link>
      ),
    },
    {
      key: "socialMediaFacebook",
      label: tWords("socialMediaFacebook"),
      children: (
        <Link href={item?.socialMediaFacebook ?? "/"} target="_blank">
          {item?.socialMediaFacebook}
        </Link>
      ),
    },

    {
      key: "image1",
      label: tWords("imageCount", { count: 1 }),
      children: (
        <Link href={item?.image1 ?? "/"} target="_blank">
          {item?.image1}
        </Link>
      ),
    },
    {
      key: "image2",
      label: tWords("imageCount", { count: 2 }),
      children: (
        <Link href={item?.image2 ?? "/"} target="_blank">
          {item?.image2}
        </Link>
      ),
    },
    {
      key: "image3",
      label: tWords("imageCount", { count: 3 }),
      children: (
        <Link href={item?.image3 ?? "/"} target="_blank">
          {item?.image3}
        </Link>
      ),
    },
    {
      key: "image4",
      label: tWords("imageCount", { count: 4 }),
      children: (
        <Link href={item?.image4 ?? "/"} target="_blank">
          {item?.image4}
        </Link>
      ),
    },
    {
      key: "image5",
      label: tWords("imageCount", { count: 5 }),
      children: (
        <Link href={item?.image5 ?? "/"} target="_blank">
          {item?.image5}
        </Link>
      ),
    },
  ];
}

export function DescriptionSchoolConfig(
  item?: SchoolConfigResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    {
      key: "websiteDomainName",
      label: tWords("websiteDomainName"),
      children: item?.websiteDomainName,
    },
    {
      key: "userEmailDomainName",
      label: tWords("userEmailDomainName"),
      children: item?.userEmailDomainName,
    },
    {
      key: "supportEmail",
      label: tWords("supportEmail"),
      children: item?.supportEmail,
    },
    {
      key: "googleWorkspaceCredentials",
      label: tWords("googleWorkspaceCredentials"),
      children: item?.googleWorkspaceCredentials,
    },
    {
      key: "googleWorkspaceUserEmailDomain",
      label: tWords("googleWorkspaceUserEmailDomain"),
      children: item?.googleWorkspaceUserEmailDomain,
    },
    {
      key: "smsUserID",
      label: tWords("smsUserID"),
      children: item?.smsUserID,
    },
    {
      key: "whatsappToken",
      label: tWords("whatsappToken"),
      children: item?.whatsappToken,
    },
    {
      key: "whatsappPhoneID",
      label: tWords("whatsappPhoneID"),
      children: item?.whatsappPhoneID,
    },
    {
      key: "telegramBotToken",
      label: tWords("telegramBotToken"),
      children: item?.telegramBotToken,
    },
    {
      key: "websiteTitle",
      label: tWords("websiteTitle"),
      children: item?.websiteTitle,
    },
    {
      key: "websiteDescription",
      label: tWords("websiteDescription"),
      children: item?.websiteDescription,
    },
    {
      key: "colorPrimary",
      label: tWords("colorPrimary"),
      children: (
        <DescriptionColor color={item?.colorPrimary ?? COLOR_SCHEME.primary} />
      ),
    },
    {
      key: "colorPrimaryBg",
      label: tWords("colorPrimaryBg"),
      children: (
        <DescriptionColor
          color={item?.colorPrimaryBg ?? COLOR_SCHEME.primaryBg}
        />
      ),
    },
    {
      key: "colorPrimaryBgHover",
      label: tWords("colorPrimaryBgHover"),
      children: (
        <DescriptionColor
          color={item?.colorPrimaryBgHover ?? COLOR_SCHEME.primaryBgHover}
        />
      ),
    },
  ];
}

function DescriptionColor(props: { color?: string }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: props.color,
          padding: "4px",
        }}
      />
      <Text>{props.color}</Text>
    </div>
  );
}

function getDeploymentInformationFromBase64(data?: string): string {
  if (!data || data.trim().length < 1) {
    return "";
  }
  const base64Prefix = "Base64 SMTP conf = ";
  let base64Content = data;
  if (data.startsWith(base64Prefix)) {
    base64Content = data.slice(base64Prefix.length);
  }

  try {
    const decodedTextUtf8 = base64ToUtf8(base64Content);
    return decodedTextUtf8;
  } catch {
    // If base64ToUtf8 fails, just return the original data
    return data;
  }
}
