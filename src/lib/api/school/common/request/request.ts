import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { RequestResponse } from "./response";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface RequestRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  sequenceID?: IDType | null;
  unitID?: IDType | null;

  audience?: string | null;
  title?: string | null;
  message?: string | null;
  document1?: string | null;
  document2?: string | null;
  document3?: string | null;
  document4?: string | null;
  document5?: string | null;
}
export interface RequestStatusRequest extends BaseRequest {
  status?: string | null;
  statusFeedback?: string | null;
}

export interface RequestListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  sequenceID?: IDType | null;
  unitID?: IDType | null;
  studentID?: IDType | null;

  audience?: string | null;
}

// Format request
export function formatRequestFormToRequest(item?: RequestRequest) {
  if (!item) {
    return;
  }
  const tempDocuments = castFileToStringUrl(
    item.document1 as UploadFile[] | undefined,
  );

  const newItem: RequestRequest = {
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

    document1: tempDocuments.length > 0 ? tempDocuments[0] : undefined,
    document2: tempDocuments.length > 1 ? tempDocuments[1] : undefined,
    document3: tempDocuments.length > 2 ? tempDocuments[2] : undefined,
    document4: tempDocuments.length > 3 ? tempDocuments[3] : undefined,
    document5: tempDocuments.length > 4 ? tempDocuments[4] : undefined,
  };
  return newItem;
}

export function formatRequestStatusFormToRequest(item?: RequestStatusRequest) {
  if (!item) {
    return;
  }

  const newItem: RequestStatusRequest = {
    ...item,
  };
  return newItem;
}

// Compare request to response
export function compareRequestRequestToResponse(
  a?: RequestRequest,
  b?: RequestResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatRequestFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.yearID === b.year?.id &&
    tempReq?.classSubjectID === b.classSubject?.id &&
    tempReq?.sequenceID === b.sequence?.id &&
    tempReq?.unitID === b.unit?.id &&
    tempReq?.audience === b.audience &&
    tempReq?.title === b.title &&
    tempReq?.message === b.message &&
    tempReq?.document1 === b.document1 &&
    tempReq?.document2 === b.document2 &&
    tempReq?.document3 === b.document3 &&
    tempReq?.document4 === b.document4 &&
    tempReq?.document5 === b.document5
  );
}

export function compareRequestStatusRequestToResponse(
  a?: RequestStatusRequest,
  b?: RequestResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatRequestStatusFormToRequest(a);

  return (
    tempReq?.status === b.status && tempReq?.statusFeedback === b.statusFeedback
  );
}
