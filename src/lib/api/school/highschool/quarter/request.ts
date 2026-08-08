import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { IDType } from "@/types/http/base-response";
import { BaseRequest } from "@/types/http/base-request";
import { QuarterResponse } from "./response";

export interface QuarterRequest extends BaseRequest {
  schoolID?: IDType | null;
  name?: string | null;
  description?: string | null;
}

export interface QuarterListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatQuarterFormToRequest(item?: QuarterRequest) {
  if (!item) {
    return;
  }
  const newItem: QuarterRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareQuarterRequestToResponse(
  a?: QuarterRequest,
  b?: QuarterResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatQuarterFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
