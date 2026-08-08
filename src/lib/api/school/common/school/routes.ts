import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  SchoolRequest,
  SchoolListRequest,
  formatSchoolFormToRequest,
} from "./request";
import { SchoolResponse, SchoolListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools`;

// School
export async function getSchool(id: IDType) {
  return GET<SchoolResponse, null>(`${PATH_GROUP}/${id}`);
}
export async function getSchoolList(
  params: SchoolListRequest,
  signal?: GenericAbortSignal
) {
  return GET<SchoolListResponse, SchoolListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postSchool(item: SchoolRequest) {
  return POST<SchoolResponse, SchoolRequest>(
    `${PATH_GROUP}`,
    formatSchoolFormToRequest(item)
  );
}

export async function updateSchool(item: SchoolRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<SchoolResponse, SchoolRequest>(
    `${PATH_GROUP}/${id}`,
    formatSchoolFormToRequest(item)
  );
}

export async function deleteSchool(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}

export async function deleteMultipleSchool(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
