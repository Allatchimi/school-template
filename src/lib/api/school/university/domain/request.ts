import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { DomainResponse } from "./response";

export interface DomainRequest extends BaseRequest {
  schoolID?: IDType | null;
  departmentID?: IDType | null;
  name?: string | null;
  description?: string | null;
}

export interface DomainListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  departmentID?: IDType | null;
}

// Format request
export function formatDomainFormToRequest(item?: DomainRequest) {
  if (!item) {
    return;
  }
  const newItem: DomainRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    departmentID:
      `${item.departmentID ?? ""}`.length > 0
        ? parseInt(`${item.departmentID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareDomainRequestToResponse(
  a?: DomainRequest,
  b?: DomainResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatDomainFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.departmentID === b.department?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
