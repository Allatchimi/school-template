import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  ParentRequest,
  ParentListRequest,
  formatParentFormToRequest,
  ParentStudentRequest,
  ParentStudentListRequest,
  formatParentStudentFormToRequest,
} from "./request";
import {
  ParentResponse,
  ParentListResponse,
  ParentStudentResponse,
  ParentStudentListResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/parents`;

// Parent
export async function getParent(id: IDType) {
  return GET<ParentResponse, ParentRequest>(`${PATH_GROUP}/${id}`);
}
export async function getParentList(
  params: ParentListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ParentListResponse, ParentListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postParent(item: ParentRequest) {
  return POST<ParentResponse, ParentRequest>(
    `${PATH_GROUP}`,
    formatParentFormToRequest(item)
  );
}
export async function updateParent(item: ParentRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ParentResponse, ParentRequest>(
    `${PATH_GROUP}/${id}`,
    formatParentFormToRequest(item)
  );
}
export async function deleteParent(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleParent(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Parent student
export async function getParentStudent(id: IDType) {
  return GET<ParentStudentResponse, ParentStudentRequest>(
    `${PATH_GROUP}/students/${id}`
  );
}
export async function getParentStudentList(
  params: ParentStudentListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ParentStudentListResponse, ParentStudentListRequest>(
    `${PATH_GROUP}/students`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
export async function postParentStudent(item: ParentStudentRequest) {
  return POST<ParentStudentResponse, ParentStudentRequest>(
    `${PATH_GROUP}/students`,
    formatParentStudentFormToRequest(item)
  );
}
export async function updateParentStudent(item: ParentStudentRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ParentStudentResponse, ParentStudentRequest>(
    `${PATH_GROUP}/students/${id}`,
    formatParentStudentFormToRequest(item)
  );
}
export async function deleteParentStudent(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/students/${id}`);
}
export async function deleteMultipleParentStudent(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/students/multiple/delete`,
    {
      data: selection,
    }
  );
}
