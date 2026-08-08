import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, PUT, DELETE } from "@/lib/http/http";
import { DefaultResponse, IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  NotificationListRequest,
  NotificationSeenRequest,
  formatNotificationSeenFormToRequest,
  NotificationSeenAllRequest,
  formatNotificationSeenAllFormToRequest,
} from "./request";
import {
  NotificationResponse,
  NotificationNotSeenCountResponse,
  NotificationListResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/notifications`;

// Notification
export async function getNotification(id: IDType) {
  return GET<NotificationResponse, null>(`${PATH_GROUP}/${id}`);
}
export async function getNotificationNotSeenCount() {
  return GET<NotificationNotSeenCountResponse, null>(
    `${PATH_GROUP}/notseen/count`,
  );
}
export async function getNotificationList(
  params: NotificationListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<NotificationListResponse, NotificationListRequest>(
    `${PATH_GROUP}`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function updateNotificationSeen(item: NotificationSeenRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<NotificationResponse, NotificationSeenRequest>(
    `${PATH_GROUP}/${id}/seen`,
    formatNotificationSeenFormToRequest(item),
  );
}
export async function updateNotificationSeenAll(
  item: NotificationSeenAllRequest,
) {
  return PUT<DefaultResponse, NotificationSeenAllRequest>(
    `${PATH_GROUP}/seen/all`,
    formatNotificationSeenAllFormToRequest(item),
  );
}
export async function deleteNotification(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteNotificationAll() {
  return DELETE<number, null>(`${PATH_GROUP}/all`);
}
