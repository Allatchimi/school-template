import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { ContactResponse } from "./response";

export interface ContactRequest extends BaseRequest {
  schoolID?: IDType | null;
  subject?: string | null;
  email?: string | null;
  message?: string | null;
}

export interface ContactListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatContactFormToRequest(item?: ContactRequest) {
  if (!item) {
    return;
  }
  const newItem: ContactRequest = {
    ...item,
    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareContactRequestToResponse(
  a?: ContactRequest,
  b?: ContactResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatContactFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.subject === b.subject &&
    tempReq?.email === b.email &&
    tempReq?.message === b.message
  );
}
