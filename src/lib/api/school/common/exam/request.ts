import { formatDateTime } from "@/helpers/date/format";
import { BaseRequest } from "@/types/http/base-request";
import { IDType, DateType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { ExamResponse, ExamTypeResponse } from "./response";

export interface ExamRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  sequenceID?: IDType | null;
  unitID?: IDType | null;
  typeID?: IDType | null;

  status?: string | null;
  notation?: number | null;
  percentage?: number | null;
  description?: string | null;
  locationType?: string | null;
  locationDetails?: string | null;
  requirements?: string | null;
  allowedItems?: string | null;
  startDate?: DateType | null;
  endDate?: DateType | null;
  isRetry?: boolean | null;
}

export interface ExamTypeRequest extends BaseRequest {
  schoolID?: IDType | null;

  name?: string | null;
  description?: string | null;
}

export interface ExamListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  sequenceID?: IDType | null;
  unitID?: IDType | null;
  typeID?: IDType | null;
}

export interface ExamTypeListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatExamFormToRequest(item?: ExamRequest) {
  if (!item) {
    return;
  }
  const newItem: ExamRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    yearID:
      `${item.yearID ?? ""}`.length > 0
        ? parseInt(`${item.yearID}`)
        : undefined,
    classSubjectID:
      `${item.classSubjectID ?? ""}`.length > 0
        ? parseInt(`${item.classSubjectID}`)
        : undefined,
    sequenceID:
      `${item.sequenceID ?? ""}`.length > 0
        ? parseInt(`${item.sequenceID}`)
        : undefined,
    unitID:
      `${item.unitID ?? ""}`.length > 0
        ? parseInt(`${item.unitID}`)
        : undefined,
    typeID:
      `${item.typeID ?? ""}`.length > 0
        ? parseInt(`${item.typeID}`)
        : undefined,
    notation:
      `${item.notation ?? ""}`.length > 0
        ? parseFloat(`${item.notation}`)
        : undefined,
    percentage:
      `${item.percentage ?? ""}`.length > 0
        ? parseInt(`${item.percentage}`)
        : undefined,
  };
  return newItem;
}

export function formatExamTypeFormToRequest(item?: ExamTypeRequest) {
  if (!item) {
    return;
  }
  const newItem: ExamTypeRequest = {
    ...item,

    schoolID: parseInt(`${item.schoolID}`),
  };
  return newItem;
}

// Compare request to response
export function compareExamRequestToResponse(
  a?: ExamRequest,
  b?: ExamResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatExamFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.yearID === b.year?.id &&
    tempReq?.classSubjectID === b.classSubject?.id &&
    tempReq?.sequenceID === b.sequence?.id &&
    tempReq?.unitID === b.unit?.id &&
    tempReq?.typeID === b.type?.id &&
    tempReq?.status === b.status &&
    tempReq?.notation === b.notation &&
    tempReq?.percentage === b.percentage &&
    tempReq?.description === b.description &&
    tempReq?.locationType === b.locationType &&
    tempReq?.locationDetails === b.locationDetails &&
    tempReq?.requirements === b.requirements &&
    tempReq?.allowedItems === b.allowedItems &&
    tempReq?.isRetry === b.isRetry &&
    formatDateTime(tempReq?.startDate?.toString()) ===
      formatDateTime(b.startDate?.toString()) &&
    formatDateTime(tempReq?.endDate?.toString()) ===
      formatDateTime(b.endDate?.toString())
  );
}

export function compareExamTypeRequestToResponse(
  a?: ExamTypeRequest,
  b?: ExamTypeResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatExamTypeFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}
