import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { DepartmentListResponse, DepartmentResponse } from "./response";
import { DepartmentListRequest, DepartmentRequest } from "./request";
import { IDType } from "@/types/http/base-response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { formatDepartmentFormToRequest } from "./request";
import { SelectionRequest } from "@/types/http/base-request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/university/departments`;

// Department
export async function getDepartment(id: IDType) {
  return GET<DepartmentResponse, DepartmentRequest>(`${PATH_GROUP}/${id}`);
}
export async function getDepartmentList(
  params: DepartmentListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<DepartmentListResponse, DepartmentListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postDepartment(item: DepartmentRequest) {
  return POST<DepartmentResponse, DepartmentRequest>(
    `${PATH_GROUP}`,
    formatDepartmentFormToRequest(item),
  );
}
export async function updateDepartment(item: DepartmentRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<DepartmentResponse, DepartmentRequest>(
    `${PATH_GROUP}/${id}`,
    formatDepartmentFormToRequest(item),
  );
}
export async function deleteDepartment(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleDepartment(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
