import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { SequenceResponse } from "./response";

export interface SequenceRequest extends BaseRequest {
  schoolID?: IDType | null;
  quarterID?: IDType | null;

  name?: string | null;
  description?: string | null;
}

export interface SequenceListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  quarterID?: IDType | null;
}

// Format request
export function formatSequenceFormToRequest(item?: SequenceRequest) {
  if (!item) {
    return;
  }
  const newItem: SequenceRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    quarterID:
      `${item.quarterID ?? ""}`.length > 0
        ? parseInt(`${item.quarterID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareSequenceRequestToResponse(
  a?: SequenceRequest,
  b?: SequenceResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatSequenceFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.quarterID === b.quarter?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
