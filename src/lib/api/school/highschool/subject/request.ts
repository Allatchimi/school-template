import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { SubjectResponse } from "./response";

export interface SubjectRequest extends BaseRequest {
  schoolID?: IDType | null;

  name?: string | null;
  description?: string | null;
}

export interface SubjectListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatSubjectFormToRequest(item?: SubjectRequest) {
  if (!item) {
    return;
  }
  const newItem: SubjectRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareSubjectRequestToResponse(
  a?: SubjectRequest,
  b?: SubjectResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatSubjectFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
