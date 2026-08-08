import { BaseRequest } from "@/types/http/base-request";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";

export interface NotificationSeenRequest extends BaseRequest {
  seen?: boolean | null;
}
export interface NotificationSeenAllRequest extends BaseRequest {
  seen?: boolean | null;
}

export interface NotificationListRequest
  extends FilterRequest,
    PaginationRequest {}

// Format request
export function formatNotificationSeenFormToRequest(
  item?: NotificationSeenRequest,
) {
  if (!item) {
    return;
  }
  const newItem: NotificationSeenRequest = {
    ...item,
  };
  return newItem;
}
export function formatNotificationSeenAllFormToRequest(
  item?: NotificationSeenAllRequest,
) {
  if (!item) {
    return;
  }
  const newItem: NotificationSeenAllRequest = {
    ...item,
  };
  return newItem;
}
