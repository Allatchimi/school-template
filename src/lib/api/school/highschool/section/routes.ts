import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { SectionListResponse, SectionResponse } from "./response";
import {
  formatSectionFormToRequest,
  SectionListRequest,
  SectionRequest,
} from "./request";
import { SelectionRequest } from "@/types/http/base-request";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { IDType } from "@/types/http/base-response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/highschool/sections`;

// Section
export async function getSection(id: IDType) {
  return GET<SectionResponse, SectionRequest>(`${PATH_GROUP}/${id}`);
}
export async function getSectionList(
  params: SectionListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<SectionListResponse, SectionListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postSection(item: SectionRequest) {
  return POST<SectionResponse, SectionRequest>(
    `${PATH_GROUP}`,
    formatSectionFormToRequest(item),
  );
}
export async function updateSection(item: SectionRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<SectionResponse, SectionRequest>(
    `${PATH_GROUP}/${id}`,
    formatSectionFormToRequest(item),
  );
}
export async function deleteSection(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleSection(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
