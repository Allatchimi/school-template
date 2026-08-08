import { BaseResponse } from "@/types/http/base-response";

export interface ProfileMessageResponse extends BaseResponse {
  whatsappPhoneNumber?: number | null;
  telegramChatID?: number | null;
}
export interface ProfilePasswordInitResponse extends BaseResponse {
  token?: string | null;
}
export interface ProfilePasswordCheckCodeResponse extends BaseResponse {
  token?: string | null;
}
export interface ProfilePhoneNumberInitResponse extends BaseResponse {
  token?: string | null;
}
export interface ProfilePhoneNumberCheckCodeResponse extends BaseResponse {
  token?: string | null;
}
export interface ProfileMfaEmailInitResponse extends BaseResponse {
  token?: string | null;
}
export interface ProfileWebPushSubscriptionPublicKeyResponse
  extends BaseResponse {
  publicKey?: string | null;
}
