import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import {
  CommunicationListRequest,
  CommunicationRequest,
  formatCommunicationFormToRequest,
} from "./request";
import { CommunicationResponse, CommunicationListResponse } from "./response";
import { GenericAbortSignal } from "axios";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/communications`;

// Communication
export async function getCommunication(id: IDType) {
  return GET<CommunicationResponse, null>(`${PATH_GROUP}/${id}`);
}
export async function getCommunicationList(
  params: CommunicationListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<CommunicationListResponse, CommunicationListRequest>(
    `${PATH_GROUP}`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function postCommunication(item: CommunicationRequest) {
  return POST<CommunicationResponse, CommunicationRequest>(
    `${PATH_GROUP}`,
    formatCommunicationFormToRequest(item),
  );
}
export async function deleteCommunication(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleCommunication(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
