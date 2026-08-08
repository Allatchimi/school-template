"use client";

import { ReactNode } from "react";
import ImageFallback from "@/components/image/image-fallback";
import { formatDate } from "@/helpers/date/format";
import { UserResponse } from "@/lib/api/user/user/response";
import { EditOutlined } from "@ant-design/icons";
import { DescriptionsItemType } from "antd/es/descriptions";
import {
  antdTheme,
  Descriptions,
  Switch,
  Button,
  Title,
  Text,
} from "@/ui/antd";
import { useTranslations } from "next-intl";

export function UserProfile(props: {
  item?: UserResponse;
  disabled?: boolean;
  disabledMessage?: boolean;
  loadingProfile?: boolean;
  loadingProfileMessage?: boolean;
  loadingPhoneNumber?: boolean;
  onEditProfileClicked?: () => void;
  onEditMessageClicked?: () => void;
  onUpdatePhoneNumberClicked?: () => void;
}) {
  // Next hooks
  const tPage = useTranslations("Pages.profile.description");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full flex flex-col">
      <div
        style={{
          backgroundColor: theme.colorPrimaryBg,
          borderRadius: theme.borderRadius,
        }}
        className="w-full flex flex-wrap justify-between p-4 gap-4"
      >
        <div className="">
          <Title level={5}>{tWords("profile")}</Title>
          <Text type="secondary">{tPage("profile")}</Text>
        </div>
        <Button
          disabled={props.disabled}
          loading={props.loadingProfile}
          onClick={props.onEditProfileClicked}
          icon={<EditOutlined />}
        >
          {tWords("profile")}
        </Button>
      </div>
      <div className="mt-4">
        <Descriptions
          column={1}
          bordered
          items={[
            RowDescriptionText({
              title: tWords("email"),
              description: props.item?.email ?? "",
            }),
            RowDescriptionText({
              title: tWords("phoneNumber"),
              description: props.item?.phoneNumber?.toString() ?? "",
              extra: (
                <Button
                  disabled={props.disabled}
                  loading={props.loadingPhoneNumber}
                  type="link"
                  onClick={props.onUpdatePhoneNumberClicked}
                  icon={<EditOutlined />}
                >
                  {tWords("edit")}
                </Button>
              ),
            }),
            RowDescriptionText({
              title: tWords("fullName"),
              description: `${props.item?.info?.firstName ?? ""} ${props.item?.info?.lastName ?? ""}`,
            }),
            RowDescriptionText({
              title: tWords("address"),
              description: props.item?.info?.address ?? "",
            }),
            RowDescriptionText({
              title: tWords("birthday"),
              description: `${formatDate(
                props.item?.info?.birthday?.toString()
              )} ${props.item?.info?.birthLocation || ""}`,
            }),
            RowDescriptionText({
              title: tWords("gender"),
              description: props.item?.info?.gender
                ? tEnums(`gender.${props.item?.info?.gender}`)
                : "",
            }),
            RowDescriptionText({
              title: tWords("language"),
              description: props.item?.info?.language
                ? tEnums(`language.${props.item?.info?.language}`)
                : "",
            }),
          ]}
        />
      </div>
      <div className="mt-8">
        <UserProfileMessage
          item={props.item}
          disabled={props.disabledMessage}
          loading={props.loadingProfileMessage}
          onEditClicked={props.onEditMessageClicked}
        />
      </div>
    </div>
  );
}

export function UserProfileMessage(props: {
  item?: UserResponse;
  disabled?: boolean;
  loading?: boolean;
  onEditClicked?: () => void;
}) {
  // Next hooks
  const tPage = useTranslations("Pages.profile.description");
  const tWords = useTranslations("Words");

  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap justify-between gap-4">
        <div className="">
          <Title level={5}>{tWords("message")}</Title>
          <Text type="secondary">{tPage("message")}</Text>
        </div>
        <Button
          disabled={props.disabled}
          loading={props.loading}
          onClick={props.onEditClicked}
          icon={<EditOutlined />}
        >
          {tWords("message")}
        </Button>
      </div>
      <div className="mt-4">
        <Descriptions
          column={1}
          bordered
          items={[
            RowDescriptionText({
              title: tWords("whatsappPhoneNumber"),
              description:
                props.item?.config?.whatsappPhoneNumber?.toString() ?? "",
            }),
            RowDescriptionText({
              title: tWords("telegramChatID"),
              description: props.item?.config?.telegramChatID?.toString() ?? "",
            }),
          ]}
        />
      </div>
    </div>
  );
}

export function UserProfileSettings(props: {
  disabled?: boolean;
  loadingPassword?: boolean;
  loadingNotifications?: boolean;
  loadingMfaEmail?: boolean;
  loadingMfaAuthenticator?: boolean;
  isNotificationsEnabled?: boolean;
  isMfaEmailEnabled?: boolean;
  isMfaAuthenticatorEnabled?: boolean;
  onUpdatePasswordClicked?: () => void;
  onToggleNotifications?: (value: boolean) => void;
  onToggleMfaEmail?: (value: boolean) => void;
  onToggleMfaAuthenticator?: (value: boolean) => void;
}) {
  // Next hooks
  const tPage = useTranslations("Pages.profile.description");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full">
      <div
        style={{
          backgroundColor: theme.colorPrimaryBg,
          borderRadius: theme.borderRadius,
        }}
        className="w-full flex flex-wrap justify-between p-4 gap-4"
      >
        <div className="">
          <Title level={5}>{tWords("settings")}</Title>
          <Text type="secondary">{tPage("settings")}</Text>
        </div>
        <Button
          disabled={props.disabled}
          loading={props.loadingPassword}
          onClick={props.onUpdatePasswordClicked}
          icon={<EditOutlined />}
        >
          {tWords("password")}
        </Button>
      </div>
      <div className="mt-4">
        <Descriptions
          column={1}
          bordered
          items={[
            RowDescriptionSwitch({
              disabled: props.disabled,
              loading: props.loadingNotifications,
              title: tWords("notifications"),
              value: props.isNotificationsEnabled,
              onClick: props.onToggleNotifications,
            }),
            RowDescriptionSwitch({
              disabled: true,
              loading: props.loadingMfaEmail,
              title: tWords("mfaWithEmail"),
              value: props.isMfaEmailEnabled,
              onClick: props.onToggleMfaEmail,
            }),
            ...(props.isMfaAuthenticatorEnabled === true
              ? [
                  RowDescriptionSwitch({
                    disabled: true,
                    loading: props.loadingMfaAuthenticator,
                    title: tWords("mfaWithAuthenticator"),
                    value: props.isMfaAuthenticatorEnabled,
                    onClick: props.onToggleMfaAuthenticator,
                  }),
                ]
              : [
                  RowDescriptionDefault({
                    disabled: true,
                    loading: props.loadingMfaAuthenticator,
                    title: tWords("mfaWithAuthenticator"),
                    extra: (
                      <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52">
                        <ImageFallback />
                      </div>
                    ),
                  }),
                ]),
          ]}
        />
      </div>
    </div>
  );
}

function RowDescriptionDefault(props: {
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  description?: string;
  extra?: ReactNode;
}): DescriptionsItemType {
  return {
    label: props.title,
    children: props.extra,
  };
}

function RowDescriptionText(props: {
  title?: string;
  description?: string;
  extra?: ReactNode;
}): DescriptionsItemType {
  return {
    label: props.title,
    children: (
      <div className="w-auto flex items-center justify-between gap-2">
        <Text>{props.description}</Text>
        {props.extra}
      </div>
    ),
  };
}

function RowDescriptionSwitch(props: {
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  value?: boolean;
  onClick?: (value: boolean) => void;
}): DescriptionsItemType {
  return {
    label: props.title,
    children: (
      <Switch
        disabled={props.disabled}
        loading={props.loading}
        value={props.value}
        onClick={props.onClick}
      />
    ),
  };
}
