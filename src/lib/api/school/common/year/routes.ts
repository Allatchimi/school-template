import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  YearRequest,
  YearListRequest,
  formatYearFormToRequest,
} from "./request";
import { YearResponse, YearListResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/years`;

// Year
export async function getYear(id: IDType) {
  return GET<YearResponse, YearRequest>(`${PATH_GROUP}/${id}`);
}
export async function getYearList(
  params: YearListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<YearListResponse, YearListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function getYearPreEnrollList(
  params: YearListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<YearListResponse, YearListRequest>(`${PATH_GROUP}/preenroll`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postYear(item: YearRequest) {
  return POST<YearResponse, YearRequest>(
    `${PATH_GROUP}`,
    formatYearFormToRequest(item),
  );
}
export async function updateYear(item: YearRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<YearResponse, YearRequest>(
    `${PATH_GROUP}/${id}`,
    formatYearFormToRequest(item),
  );
}
export async function deleteYear(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleYear(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
