import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  ScheduleRequest,
  ScheduleListRequest,
  formatScheduleFormToRequest,
} from "./request";
import {
  ScheduleResponse,
  ScheduleListResponse,
  ScheduleWeeklyViewListResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/schedules`;

// Schedule
export async function getSchedule(id: IDType) {
  return GET<ScheduleResponse, ScheduleRequest>(`${PATH_GROUP}/${id}`);
}
export async function getScheduleList(
  params: ScheduleListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ScheduleListResponse, ScheduleListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function getScheduleWeeklyView(
  params: ScheduleListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ScheduleWeeklyViewListResponse, ScheduleListRequest>(
    `${PATH_GROUP}/weeklyview`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function postSchedule(item: ScheduleRequest) {
  return POST<ScheduleResponse, ScheduleRequest>(
    `${PATH_GROUP}`,
    formatScheduleFormToRequest(item),
  );
}
export async function updateSchedule(item: ScheduleRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ScheduleResponse, ScheduleRequest>(
    `${PATH_GROUP}/${id}`,
    formatScheduleFormToRequest(item),
  );
}
export async function deleteSchedule(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleSchedule(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
