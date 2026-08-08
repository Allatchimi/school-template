import { BaseRequest } from "@/types/http/base-request";
import { DateType } from "@/types/http/base-response";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";
import { UserResponse } from "../user/response";

export interface ProfileRequest extends BaseRequest {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: DateType | null;
  birthLocation?: string | null;
  address?: string | null;
  language?: string | null;
  image?: string | null;
}
export interface ProfileMessageRequest extends BaseRequest {
  whatsappPhoneNumber?: number | null;
  telegramChatID?: number | null;
}
export interface ProfilePasswordCheckCodeRequest extends BaseRequest {
  code?: string | null;
  token?: string | null;
}
export interface ProfilePasswordNewPasswordRequest extends BaseRequest {
  currentPassword?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  token?: string | null;
}
export interface ProfilePhoneNumberCheckCodeRequest extends BaseRequest {
  code?: string | null;
  token?: string | null;
}
export interface ProfilePhoneNumberNewPhoneNumberRequest extends BaseRequest {
  phoneNumber?: number | null;
  token?: string | null;
}
export interface ProfileMfaEmailCheckCodeRequest extends BaseRequest {
  code?: string | null;
  token?: string | null;
}
export interface ProfileSettingNotificationRequest extends BaseRequest {
  isEnabled?: boolean | null;
}
export interface UpdateProfileWebPushSubscriptionRequest extends BaseRequest {
  endpoint?: string | null;
  keys?: {
    p256dh?: string | null;
    auth?: string | null;
  } | null;
}

// Format request
export function formatProfileFormToRequest(item?: ProfileRequest) {
  if (!item) {
    return;
  }
  const tempImage = castFileToStringUrl(item.image as UploadFile[] | undefined);

  const newItem: ProfileRequest = {
    ...item,

    image: tempImage.length > 0 ? tempImage[0] : undefined,
  };
  return newItem;
}
// Message
export function formatProfileMessageFormToRequest(
  item?: ProfileMessageRequest
) {
  if (!item) {
    return;
  }

  const newItem: ProfileMessageRequest = {
    ...item,
    whatsappPhoneNumber:
      `${item.whatsappPhoneNumber ?? ""}`.length > 0
        ? parseInt(`${item.whatsappPhoneNumber}`)
        : undefined,
    telegramChatID:
      `${item.telegramChatID ?? ""}`.length > 0
        ? parseInt(`${item.telegramChatID}`)
        : undefined,
  };
  return newItem;
}
// Password
export function formatProfilePasswordCheckCodeFormToRequest(
  item?: ProfilePasswordCheckCodeRequest
) {
  if (!item) {
    return;
  }

  const newItem: ProfilePasswordCheckCodeRequest = {
    ...item,
  };
  return newItem;
}
export function formatProfilePasswordNewPasswordFormToRequest(
  item?: ProfilePasswordNewPasswordRequest
) {
  if (!item) {
    return;
  }

  const newItem: ProfilePasswordNewPasswordRequest = {
    ...item,
  };
  return newItem;
}
// Phone number
export function formatProfilePhoneNumberCheckCodeFormToRequest(
  item?: ProfilePhoneNumberCheckCodeRequest
) {
  if (!item) {
    return;
  }

  const newItem: ProfilePhoneNumberCheckCodeRequest = {
    ...item,
  };
  return newItem;
}
export function formatProfilePhoneNumberNewPhoneNumberFormToRequest(
  item?: ProfilePhoneNumberNewPhoneNumberRequest
) {
  if (!item) {
    return;
  }

  const newItem: ProfilePhoneNumberNewPhoneNumberRequest = {
    ...item,

    phoneNumber:
      `${item.phoneNumber ?? ""}`.length > 0
        ? parseInt(`${item.phoneNumber}`)
        : undefined,
  };
  return newItem;
}
// Mfa email
export function formatProfileMfaEmailCheckCodeFormToRequest(
  item?: ProfileMfaEmailCheckCodeRequest
) {
  if (!item) {
    return;
  }

  const newItem: ProfileMfaEmailCheckCodeRequest = {
    ...item,
  };
  return newItem;
}
// Notification
export function formatProfileSettingNotificationFormToRequest(
  item?: ProfileSettingNotificationRequest
) {
  if (!item) {
    return;
  }
  const newItem: ProfileSettingNotificationRequest = {
    ...item,
  };
  return newItem;
}

// Compare request to response
export function compareProfileRequestToResponse(
  a?: ProfileRequest,
  b?: UserResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatProfileFormToRequest(a);

  return (
    tempReq?.username === b.info?.username &&
    tempReq?.firstName === b.info?.firstName &&
    tempReq?.lastName === b.info?.lastName &&
    tempReq?.birthday === b.info?.birthday &&
    tempReq?.birthLocation === b.info?.birthLocation &&
    tempReq?.address === b.info?.address &&
    tempReq?.language === b.info?.language &&
    tempReq?.image === b.info?.image
  );
}
export function compareProfileMessageRequestToResponse(
  a?: ProfileMessageRequest,
  b?: UserResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatProfileMessageFormToRequest(a);

  return (
    tempReq?.whatsappPhoneNumber === b.config?.whatsappPhoneNumber &&
    tempReq?.telegramChatID === b.config?.telegramChatID
  );
}
