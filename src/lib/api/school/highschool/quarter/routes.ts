import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { QuarterListResponse, QuarterResponse } from "./response";
import {
  formatQuarterFormToRequest,
  QuarterListRequest,
  QuarterRequest,
} from "./request";
import { SelectionRequest } from "@/types/http/base-request";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { IDType } from "@/types/http/base-response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/highschool/quarters`;

// Quarter
export async function getQuarter(id: IDType) {
  return GET<QuarterResponse, QuarterRequest>(`${PATH_GROUP}/${id}`);
}
export async function getQuarterList(
  params: QuarterListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<QuarterListResponse, QuarterListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postQuarter(item: QuarterRequest) {
  return POST<QuarterResponse, QuarterRequest>(
    `${PATH_GROUP}`,
    formatQuarterFormToRequest(item),
  );
}
export async function updateQuarter(item: QuarterRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<QuarterResponse, QuarterRequest>(
    `${PATH_GROUP}/${id}`,
    formatQuarterFormToRequest(item),
  );
}
export async function deleteQuarter(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleQuarter(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
