import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { SemesterListResponse, SemesterResponse } from "./response";
import {
  formatSemesterFormToRequest,
  SemesterListRequest,
  SemesterRequest,
} from "./request";
import { IDType } from "@/types/http/base-response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { SelectionRequest } from "@/types/http/base-request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/university/semesters`;

// Semester
export async function getSemester(id: IDType) {
  return GET<SemesterResponse, SemesterRequest>(`${PATH_GROUP}/${id}`);
}
export async function getSemesterList(
  params: SemesterListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<SemesterListResponse, SemesterListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postSemester(item: SemesterRequest) {
  return POST<SemesterResponse, SemesterRequest>(
    `${PATH_GROUP}`,
    formatSemesterFormToRequest(item),
  );
}
export async function updateSemester(item: SemesterRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<SemesterResponse, SemesterRequest>(
    `${PATH_GROUP}/${id}`,
    formatSemesterFormToRequest(item),
  );
}
export async function deleteSemester(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleSemester(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
