import {
  BaseResponse,
  DateType,
  IDType,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { RoleResponse } from "../role/response";
import { SchoolResponse } from "../../school/common/school/response";

export interface UserResponse extends BaseResponse {
  email?: string | null;
  phoneNumber?: number | null;

  loginMethod?: string | null;
  provider?: string | null;
  providerUserID?: string | null;
  isActivated?: boolean | null;
  activatedAt?: DateType | null;
  status?: string | null;

  school?: SchoolResponse | null;
  role?: RoleResponse | null;
  info?: UserInfoResponse | null;
  config?: UserConfigResponse | null;
}

export interface UserInfoResponse {
  userID?: IDType | null;

  gender?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: DateType | null;
  birthLocation?: string | null;
  address?: string | null;
  language?: string | null;
  image?: string | null;
}

export interface UserConfigResponse {
  userID?: IDType | null;

  whatsappPhoneNumber?: number | null;
  telegramChatID?: number | null;

  allowNotifications?: boolean | null;
  mfaEmail?: boolean | null;
  mfaAuthenticator?: boolean | null;
}

export interface UserListResponse extends BasePaginatedResponse {
  data?: UserResponse[] | null;
}
