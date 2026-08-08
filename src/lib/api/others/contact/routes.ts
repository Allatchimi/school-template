import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import {
  ContactListRequest,
  ContactRequest,
  formatContactFormToRequest,
} from "./request";
import { ContactResponse, ContactListResponse } from "./response";
import { GenericAbortSignal } from "axios";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/contacts`;

// Contact
export async function getContact(id: IDType) {
  return GET<ContactResponse, null>(`${PATH_GROUP}/${id}`);
}
export async function getContactList(
  params: ContactListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ContactListResponse, ContactListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postContact(item: ContactRequest) {
  return POST<ContactResponse, ContactRequest>(
    `${PATH_GROUP}`,
    formatContactFormToRequest(item),
  );
}
export async function deleteContact(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleContact(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
