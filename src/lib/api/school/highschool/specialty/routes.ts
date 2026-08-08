import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { SpecialtyListResponse, SpecialtyResponse } from "./response";
import { SpecialtyListRequest, SpecialtyRequest } from "./request";
import { SelectionRequest } from "@/types/http/base-request";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { IDType } from "@/types/http/base-response";
import { formatSpecialtyFormToRequest } from "./request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/highschool/specialties`;

// Specialty
export async function getSpecialty(id: IDType) {
  return GET<SpecialtyResponse, SpecialtyRequest>(`${PATH_GROUP}/${id}`);
}
export async function getSpecialtyList(
  params: SpecialtyListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<SpecialtyListResponse, SpecialtyListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postSpecialty(item: SpecialtyRequest) {
  return POST<SpecialtyResponse, SpecialtyRequest>(
    `${PATH_GROUP}`,
    formatSpecialtyFormToRequest(item),
  );
}
export async function updateSpecialty(item: SpecialtyRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<SpecialtyResponse, SpecialtyRequest>(
    `${PATH_GROUP}/${id}`,
    formatSpecialtyFormToRequest(item),
  );
}
export async function deleteSpecialty(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleSpecialty(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
