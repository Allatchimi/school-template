import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { FacultyListResponse, FacultyResponse } from "./response";
import { FacultyListRequest, FacultyRequest } from "./request";
import { IDType } from "@/types/http/base-response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { formatFacultyFormToRequest } from "./request";
import { SelectionRequest } from "@/types/http/base-request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/university/faculties`;

// Faculty
export async function getFaculty(id: IDType) {
  return GET<FacultyResponse, FacultyRequest>(`${PATH_GROUP}/${id}`);
}
export async function getFacultyList(
  params: FacultyListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<FacultyListResponse, FacultyListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postFaculty(item: FacultyRequest) {
  return POST<FacultyResponse, FacultyRequest>(
    `${PATH_GROUP}`,
    formatFacultyFormToRequest(item),
  );
}
export async function updateFaculty(item: FacultyRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<FacultyResponse, FacultyRequest>(
    `${PATH_GROUP}/${id}`,
    formatFacultyFormToRequest(item),
  );
}
export async function deleteFaculty(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleFaculty(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
