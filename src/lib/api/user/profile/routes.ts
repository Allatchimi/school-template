import { GET, PUT } from "@/lib/http/http";
import {
  formatProfileFormToRequest,
  ProfileRequest,
  ProfileMfaEmailCheckCodeRequest,
  ProfilePasswordCheckCodeRequest,
  formatProfilePasswordCheckCodeFormToRequest,
  formatProfilePasswordNewPasswordFormToRequest,
  formatProfilePhoneNumberCheckCodeFormToRequest,
  formatProfilePhoneNumberNewPhoneNumberFormToRequest,
  ProfilePhoneNumberCheckCodeRequest,
  ProfilePasswordNewPasswordRequest,
  formatProfileMfaEmailCheckCodeFormToRequest,
  UpdateProfileWebPushSubscriptionRequest,
  ProfileMessageRequest,
  formatProfileMessageFormToRequest,
} from "./request";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { UserInfoResponse, UserResponse } from "../user/response";
import {
  ProfileMfaEmailInitResponse,
  ProfilePasswordCheckCodeResponse,
  ProfilePasswordInitResponse,
  ProfilePhoneNumberCheckCodeResponse,
  ProfilePhoneNumberInitResponse,
  ProfileWebPushSubscriptionPublicKeyResponse,
  ProfileMessageResponse,
} from "./response";
import { DefaultResponse } from "@/types/http/base-response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/profile`;

// Profile
export async function getProfileServerSide(token?: string) {
  const tmpPath = `${process.env.API_BASE_URL}/profile`;
  return GET<UserResponse, null>(`${tmpPath}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-School-Id": process.env.SCHOOL_ID,
      "X-School-Api-Key": process.env.SCHOOL_API_KEY,
    },
  });
}
export async function getProfile() {
  return GET<UserResponse, null>(`${PATH_GROUP}`);
}
export async function updateProfile(item: ProfileRequest) {
  return PUT<UserInfoResponse, ProfileRequest>(
    `${PATH_GROUP}/info`,
    formatProfileFormToRequest(item)
  );
}
// Message
export async function updateProfileMessage(item: ProfileMessageRequest) {
  return PUT<ProfileMessageResponse, ProfileMessageRequest>(
    `${PATH_GROUP}/config/message`,
    formatProfileMessageFormToRequest(item)
  );
}
// Profile password
export async function updateProfilePasswordInit() {
  return PUT<ProfilePasswordInitResponse, null>(`${PATH_GROUP}/password/init`);
}
export async function updateProfilePasswordCheckCode(
  item: ProfilePasswordCheckCodeRequest
) {
  return PUT<ProfilePasswordCheckCodeResponse, ProfilePasswordCheckCodeRequest>(
    `${PATH_GROUP}/password/checkcode`,
    formatProfilePasswordCheckCodeFormToRequest(item)
  );
}
export async function updateProfilePasswordNewPassword(
  item: ProfilePasswordNewPasswordRequest
) {
  return PUT<UserResponse, ProfilePasswordNewPasswordRequest>(
    `${PATH_GROUP}/password/new`,
    formatProfilePasswordNewPasswordFormToRequest(item)
  );
}
// Profile phone number
export async function updateProfilePhoneNumberInit() {
  return PUT<ProfilePhoneNumberInitResponse, null>(
    `${PATH_GROUP}/phonenumber/init`
  );
}
export async function updateProfilePhoneNumberCheckCode(
  item: ProfilePhoneNumberCheckCodeRequest
) {
  return PUT<
    ProfilePhoneNumberCheckCodeResponse,
    ProfilePhoneNumberCheckCodeRequest
  >(
    `${PATH_GROUP}/phonenumber/checkcode`,
    formatProfilePhoneNumberCheckCodeFormToRequest(item)
  );
}
export async function updateProfilePhoneNumberNewPhoneNumber(
  item: ProfilePhoneNumberCheckCodeRequest
) {
  return PUT<UserResponse, ProfilePhoneNumberCheckCodeRequest>(
    `${PATH_GROUP}/phonenumber/new`,
    formatProfilePhoneNumberNewPhoneNumberFormToRequest(item)
  );
}
// Profile mfa
export async function updateProfileMfaEmailInit() {
  return PUT<ProfileMfaEmailInitResponse, null>(
    `${PATH_GROUP}/config/mfa/email/init`
  );
}
export async function updateProfileMfaEmailCheckCode(
  item: ProfileMfaEmailCheckCodeRequest
) {
  return PUT<UserResponse, ProfileMfaEmailCheckCodeRequest>(
    `${PATH_GROUP}/config/mfa/email/checkcode`,
    formatProfileMfaEmailCheckCodeFormToRequest(item)
  );
}
// Profile notification
export async function updateProfileSettingNotification(item: ProfileRequest) {
  return PUT<UserResponse, ProfileRequest>(
    `${PATH_GROUP}/config/notification`,
    formatProfileFormToRequest(item)
  );
}
// Profile web push subscription
export async function getProfileWebPushSubscriptionPublicKey() {
  return GET<ProfileWebPushSubscriptionPublicKeyResponse, null>(
    `${PATH_GROUP}/config/webpush/publickey`
  );
}
export async function updateProfileWebPushSubscription(
  item: UpdateProfileWebPushSubscriptionRequest
) {
  return PUT<DefaultResponse, UpdateProfileWebPushSubscriptionRequest>(
    `${PATH_GROUP}/config/webpush/subscription`,
    formatProfileFormToRequest(item)
  );
}
