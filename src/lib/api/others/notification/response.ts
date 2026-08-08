import {
  BaseResponse,
  BasePaginatedResponse,
  DateType,
} from "@/types/http/base-response";
import { UserResponse } from "../../user/user/response";

export interface WSNotificationResponse extends BaseResponse {
  audience?: string | null;
  title?: string | null;
  message?: string | null;
  seen?: boolean | null;
  href?: string | null;
  createdAt?: DateType | null;
}

export interface NotificationResponse extends BaseResponse {
  user?: UserResponse | null;

  title?: string | null;
  message?: string | null;
  seen?: boolean | null;
}

export interface NotificationNotSeenCountResponse extends BaseResponse {
  count?: number | null;
}

export interface NotificationListResponse extends BasePaginatedResponse {
  data?: NotificationResponse[] | null;
}
