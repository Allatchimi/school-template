import { IDType } from "@/types/http/base-response";
import { BaseRequest } from "@/types/http/base-request";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { SemesterResponse } from "./response";

export interface SemesterRequest extends BaseRequest {
  schoolID?: IDType | null;
  name?: string | null;
  description?: string | null;
}

export interface SemesterListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatSemesterFormToRequest(item?: SemesterRequest) {
  if (!item) {
    return;
  }
  const newItem: SemesterRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareSemesterRequestToResponse(
  a?: SemesterRequest,
  b?: SemesterResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatSemesterFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
