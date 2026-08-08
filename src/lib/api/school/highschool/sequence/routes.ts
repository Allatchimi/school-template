import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { SequenceListResponse, SequenceResponse } from "./response";
import {
  formatSequenceFormToRequest,
  SequenceListRequest,
  SequenceRequest,
} from "./request";
import { SelectionRequest } from "@/types/http/base-request";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { IDType } from "@/types/http/base-response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/highschool/sequences`;

// Sequence
export async function getSequence(id: IDType) {
  return GET<SequenceResponse, SequenceRequest>(`${PATH_GROUP}/${id}`);
}
export async function getSequenceList(
  params: SequenceListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<SequenceListResponse, SequenceListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postSequence(item: SequenceRequest) {
  return POST<SequenceResponse, SequenceRequest>(
    `${PATH_GROUP}`,
    formatSequenceFormToRequest(item),
  );
}
export async function updateSequence(item: SequenceRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<SequenceResponse, SequenceRequest>(
    `${PATH_GROUP}/${id}`,
    formatSequenceFormToRequest(item),
  );
}
export async function deleteSequence(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleSequence(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
