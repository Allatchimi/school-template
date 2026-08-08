import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  ManagerRequest,
  ManagerListRequest,
  formatManagerFormToRequest,
} from "./request";
import { ManagerResponse, ManagerListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/managers`;

// Manager
export async function getManager(id: IDType) {
  return GET<ManagerResponse, ManagerRequest>(`${PATH_GROUP}/${id}`);
}
export async function getManagerList(
  params: ManagerListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ManagerListResponse, ManagerListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postManager(item: ManagerRequest) {
  return POST<ManagerResponse, ManagerRequest>(
    `${PATH_GROUP}`,
    formatManagerFormToRequest(item)
  );
}
export async function updateManager(item: ManagerRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ManagerResponse, ManagerRequest>(
    `${PATH_GROUP}/${id}`,
    formatManagerFormToRequest(item)
  );
}
export async function deleteManager(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleManager(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
