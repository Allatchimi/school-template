import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { SpecialtyResponse } from "./response";

export interface SpecialtyRequest extends BaseRequest {
  schoolID?: IDType | null;
  sectionID?: IDType | null;

  name?: string | null;
  description?: string | null;
}

export interface SpecialtyListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  sectionID?: IDType | null;
}

// Format request
export function formatSpecialtyFormToRequest(item?: SpecialtyRequest) {
  if (!item) {
    return;
  }
  const newItem: SpecialtyRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    sectionID:
      `${item.sectionID ?? ""}`.length > 0
        ? parseInt(`${item.sectionID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareSpecialtyRequestToResponse(
  a?: SpecialtyRequest,
  b?: SpecialtyResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatSpecialtyFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.sectionID === b.section?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
