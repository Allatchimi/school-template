import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { ResultResponse, ResultTableResponse } from "./response";

export interface ResultRequest extends BaseRequest {
  schoolID?: IDType | null;
  examID?: IDType | null;
  studentID?: IDType | null;

  score?: number | null;
}

export interface ResultTableRequest extends BaseRequest {
  schoolID?: IDType | null;
  examID?: IDType | null;

  status?: number | null;
}

export interface ResultListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  sequenceID?: IDType | null;
  unitID?: IDType | null;
  semesterID?: IDType | null;
  examID?: IDType | null;
  examTypeID?: IDType | null;
  studentID?: IDType | null;
}

export interface ResultTableListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  sequenceID?: IDType | null;
  unitID?: IDType | null;
  semesterID?: IDType | null;
  examID?: IDType | null;
  examTypeID?: IDType | null;
}

// Format request
export function formatResultFormToRequest(item?: ResultRequest) {
  if (!item) {
    return;
  }
  const newItem: ResultRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    examID:
      `${item.examID ?? ""}`.length > 0
        ? parseInt(`${item.examID}`)
        : undefined,
    studentID:
      `${item.studentID ?? ""}`.length > 0
        ? parseInt(`${item.studentID}`)
        : undefined,
    score:
      `${item.score ?? ""}`.length > 0
        ? parseFloat(`${item.score}`)
        : undefined,
  };
  return newItem;
}
export function formatResultTableFormToRequest(item?: ResultTableRequest) {
  if (!item) {
    return;
  }
  const newItem: ResultTableRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    examID:
      `${item.examID ?? ""}`.length > 0
        ? parseInt(`${item.examID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareResultRequestToResponse(
  a?: ResultRequest,
  b?: ResultResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatResultFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.examID === b.exam?.id &&
    tempReq?.studentID === b.student?.id &&
    tempReq?.score === b.score
  );
}
export function compareResultTableRequestToResponse(
  a?: ResultTableRequest,
  b?: ResultTableResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatResultTableFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.examID === b.exam?.id &&
    tempReq?.status === b.status
  );
}
