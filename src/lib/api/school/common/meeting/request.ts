import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { MeetingResponse } from "./response";

export interface MeetingRequest extends BaseRequest {
  schoolID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
}

export interface MeetingListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
}

// Format request
export function formatMeetingFormToRequest(item?: MeetingRequest) {
  if (!item) {
    return;
  }
  const newItem: MeetingRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    classSubjectID:
      `${item.classSubjectID ?? ""}`.length > 0
        ? parseInt(`${item.classSubjectID}`)
        : undefined,
    unitID:
      `${item.unitID ?? ""}`.length > 0
        ? parseInt(`${item.unitID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareMeetingRequestToResponse(
  a?: MeetingRequest,
  b?: MeetingResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatMeetingFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.classSubjectID === b.classSubject?.id &&
    tempReq?.unitID === b.unit?.id
  );
}
