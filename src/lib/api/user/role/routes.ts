import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import {
  formatRoleFormToRequest,
  RoleListRequest,
  RoleRequest,
} from "./request";
import { SelectionRequest } from "@/types/http/base-request";
import { RoleResponse, RoleListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/roles`;

// Role
export async function getRole(id: IDType) {
  return GET<RoleResponse, RoleRequest>(`${PATH_GROUP}/${id}`);
}
export async function getRoleList(
  params: RoleListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<RoleListResponse, RoleListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postRole(item: RoleRequest) {
  return POST<RoleResponse, RoleRequest>(
    `${PATH_GROUP}`,
    formatRoleFormToRequest(item),
  );
}
export async function updateRole(item: RoleRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<RoleResponse, RoleRequest>(
    `${PATH_GROUP}/${id}`,
    formatRoleFormToRequest(item),
  );
}
export async function deleteRole(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleRole(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
