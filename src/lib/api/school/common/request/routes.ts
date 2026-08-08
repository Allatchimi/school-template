import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  RequestRequest,
  RequestListRequest,
  formatRequestFormToRequest,
  RequestStatusRequest,
  formatRequestStatusFormToRequest,
} from "./request";
import { RequestResponse, RequestListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/requests`;

// Request
export async function getRequest(id: IDType) {
  return GET<RequestResponse, RequestRequest>(`${PATH_GROUP}/${id}`);
}
export async function getRequestList(
  params: RequestListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<RequestListResponse, RequestListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postRequest(item: RequestRequest) {
  return POST<RequestResponse, RequestRequest>(
    `${PATH_GROUP}`,
    formatRequestFormToRequest(item),
  );
}
export async function updateRequest(item: RequestRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<RequestResponse, RequestRequest>(
    `${PATH_GROUP}/${id}`,
    formatRequestFormToRequest(item),
  );
}
export async function updateRequestStatus(item: RequestStatusRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<RequestResponse, RequestStatusRequest>(
    `${PATH_GROUP}/${id}/status`,
    formatRequestStatusFormToRequest(item),
  );
}
export async function deleteRequest(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleRequest(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
