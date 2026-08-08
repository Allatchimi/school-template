import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { SelectionRequest } from "@/types/http/base-request";
import {
  UserRequest,
  UserListRequest,
  formatUserFormToRequest,
} from "./request";
import { UserResponse, UserListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/users`;

// User
export async function getUser(id: IDType) {
  return GET<UserResponse, UserRequest>(`${PATH_GROUP}/${id}`);
}
export async function getUserList(
  params: UserListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<UserListResponse, UserListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postUser(item: UserRequest) {
  return POST<UserResponse, UserRequest>(
    `${PATH_GROUP}`,
    formatUserFormToRequest(item),
  );
}
export async function updateUser(item: UserRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<UserResponse, UserRequest>(
    `${PATH_GROUP}/${id}`,
    formatUserFormToRequest(item),
  );
}
export async function deleteUser(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleUser(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
