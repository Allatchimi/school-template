import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { CommunicationResponse } from "./response";

export interface CommunicationRequest extends BaseRequest {
  schoolID?: IDType | null;
  roleIDs?: IDType[] | null;

  subject?: string | null;
  message?: string | null;
}

export interface CommunicationListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatCommunicationFormToRequest(item?: CommunicationRequest) {
  if (!item) {
    return;
  }
  const newItem: CommunicationRequest = {
    ...item,
    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    roleIDs: item.roleIDs?.map((item) =>
      `${item ?? ""}`.length > 0 ? parseInt(`${item}`) : 0,
    ),
  };
  return newItem;
}

// Compare request to response
export function compareCommunicationRequestToResponse(
  a?: CommunicationRequest,
  b?: CommunicationResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatCommunicationFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.subject === b.subject &&
    tempReq?.message === b.message
  );
}
