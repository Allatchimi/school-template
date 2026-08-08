import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { IDType } from "@/types/http/base-response";
import { BaseRequest } from "@/types/http/base-request";
import { SectionResponse } from "./response";

export interface SectionRequest extends BaseRequest {
  schoolID?: IDType | null;

  name?: string | null;
  description?: string | null;
}

export interface SectionListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatSectionFormToRequest(item?: SectionRequest) {
  if (!item) {
    return;
  }
  const newItem: SectionRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareSectionRequestToResponse(
  a?: SectionRequest,
  b?: SectionResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatSectionFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
