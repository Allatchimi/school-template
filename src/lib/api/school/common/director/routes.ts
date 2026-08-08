import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  DirectorRequest,
  DirectorListRequest,
  formatDirectorFormToRequest,
} from "./request";
import { DirectorResponse, DirectorListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/directors`;

// Director
export async function getDirector(id: IDType) {
  return GET<DirectorResponse, DirectorRequest>(`${PATH_GROUP}/${id}`);
}
export async function getDirectorList(
  params: DirectorListRequest,
  signal?: GenericAbortSignal
) {
  return GET<DirectorListResponse, DirectorListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postDirector(item: DirectorRequest) {
  return POST<DirectorResponse, DirectorRequest>(
    `${PATH_GROUP}`,
    formatDirectorFormToRequest(item)
  );
}
export async function updateDirector(item: DirectorRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<DirectorResponse, DirectorRequest>(
    `${PATH_GROUP}/${id}`,
    formatDirectorFormToRequest(item)
  );
}
export async function deleteDirector(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleDirector(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
