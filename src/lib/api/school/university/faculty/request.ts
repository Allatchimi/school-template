import { IDType } from "@/types/http/base-response";
import { BaseRequest } from "@/types/http/base-request";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { FacultyResponse } from "./response";

export interface FacultyRequest extends BaseRequest {
  schoolID?: IDType | null;
  name?: string | null;
  description?: string | null;
}

export interface FacultyListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatFacultyFormToRequest(item?: FacultyRequest) {
  if (!item) {
    return;
  }
  const newItem: FacultyRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareFacultyRequestToResponse(
  a?: FacultyRequest,
  b?: FacultyResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatFacultyFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
