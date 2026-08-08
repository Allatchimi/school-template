import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  MeetingRequest,
  MeetingListRequest,
  formatMeetingFormToRequest,
} from "./request";
import { MeetingResponse, MeetingListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/meetings`;

// Meeting
export async function getMeeting(id: IDType) {
  return GET<MeetingResponse, MeetingRequest>(`${PATH_GROUP}/${id}`);
}
export async function getMeetingList(
  params: MeetingListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<MeetingListResponse, MeetingListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postMeeting(item: MeetingRequest) {
  return POST<MeetingResponse, MeetingRequest>(
    `${PATH_GROUP}`,
    formatMeetingFormToRequest(item),
  );
}
export async function deleteMeeting(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleMeeting(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

export async function joinMeeting(id: IDType) {
  return GET<null, null>(`${PATH_GROUP}/join/${id}`);
}
