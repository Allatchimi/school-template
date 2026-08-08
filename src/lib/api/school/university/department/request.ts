import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { DepartmentResponse } from "./response";

export interface DepartmentRequest extends BaseRequest {
  schoolID?: IDType | null;
  facultyID?: IDType | null;
  name?: string | null;
  description?: string | null;
}

export interface DepartmentListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  facultyID?: IDType | null;
}

// Format request
export function formatDepartmentFormToRequest(item?: DepartmentRequest) {
  if (!item) {
    return;
  }
  const newItem: DepartmentRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    facultyID:
      `${item.facultyID ?? ""}`.length > 0
        ? parseInt(`${item.facultyID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareDepartmentRequestToResponse(
  a?: DepartmentRequest,
  b?: DepartmentResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatDepartmentFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.facultyID === b.faculty?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
