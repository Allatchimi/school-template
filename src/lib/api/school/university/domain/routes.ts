import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { DomainListResponse, DomainResponse } from "./response";
import { DomainListRequest, DomainRequest } from "./request";
import { IDType } from "@/types/http/base-response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { formatDomainFormToRequest } from "./request";
import { SelectionRequest } from "@/types/http/base-request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/university/domains`;

// Domain
export async function getDomain(id: IDType) {
  return GET<DomainResponse, DomainRequest>(`${PATH_GROUP}/${id}`);
}
export async function getDomainList(
  params: DomainListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<DomainListResponse, DomainListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postDomain(item: DomainRequest) {
  return POST<DomainResponse, DomainRequest>(
    `${PATH_GROUP}`,
    formatDomainFormToRequest(item),
  );
}
export async function updateDomain(item: DomainRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<DomainResponse, DomainRequest>(
    `${PATH_GROUP}/${id}`,
    formatDomainFormToRequest(item),
  );
}
export async function deleteDomain(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleDomain(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
