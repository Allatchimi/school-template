import { DELETE, GET, PUT } from "@/lib/http/http";
import { IDType } from "@/types/http/base-response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { SelectionRequest } from "@/types/http/base-request";
import {
  PermissionRequest,
  PermissionListRequest,
  formatPermissionFormToRequest,
} from "./request";
import { PermissionResponse, PermissionListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/permissions`;

// Permission
export async function getPermission(id: IDType) {
  return GET<PermissionResponse, PermissionRequest>(`${PATH_GROUP}/${id}`);
}
export async function getPermissionList(params: PermissionListRequest) {
  return GET<PermissionListResponse, PermissionListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
  });
}
export async function updatePermission(item: PermissionRequest) {
  const id = item.roleID;
  item.id = undefined;
  item.roleID = undefined;
  return PUT<PermissionResponse, PermissionRequest>(
    `${PATH_GROUP}/role/${id}`,
    formatPermissionFormToRequest(item),
  );
}
export async function deletePermission(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultiplePermission(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
