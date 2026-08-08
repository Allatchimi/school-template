"use client";

import ImageFallback, {
  ImageFallbackPlaceholderText,
} from "../image/image-fallback";
import { UserResponse } from "@/lib/api/user/user/response";
import { AvatarSize } from "antd/es/avatar/AvatarContext";
import { antdTheme, Avatar } from "@/ui/antd";
import { CSSProperties } from "react";

export default function AvatarUser(props: {
  item?: UserResponse;
  fallbackText?: string;
  size?: AvatarSize;
  style?: CSSProperties;
}) {
  const firstNameSub =
    (props.item?.info?.firstName?.length ?? 0) > 0
      ? props.item?.info?.firstName?.substring(0, 1) || ""
      : "";
  const lastNameSub =
    (props.item?.info?.lastName?.length ?? 0) > 0
      ? props.item?.info?.lastName?.substring(0, 1) || ""
      : "";

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <Avatar
      style={{
        backgroundColor: theme.colorTextLightSolid,
        ...props.style,
      }}
      size={props.size ?? "default"}
      src={
        <ImageFallback
          src={props.item?.info?.image ?? undefined}
          backgroundColor="transparent"
          fallback={
            <ImageFallbackPlaceholderText
              text={
                props.fallbackText ||
                (firstNameSub.length > 0 || lastNameSub.length > 0
                  ? `${firstNameSub}${lastNameSub}`.toUpperCase()?.trim()
                  : "NA")
              }
              textColor={theme.colorTextPlaceholder}
              textFontSize="12px"
              backgroundColor="transparent"
            />
          }
        />
      }
    />
  );
}
