import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { DateType, IDType } from "@/types/http/base-response";
import { BaseRequest } from "@/types/http/base-request";
import { ClassResponse, ClassSubjectResponse } from "./response";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface ClassRequest extends BaseRequest {
  schoolID?: IDType | null;
  specialtyID?: IDType | null;

  name?: string | null;
  description?: string | null;
  fees?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
  invalidDate?: DateType | null;
}
export interface ClassSubjectRequest extends BaseRequest {
  schoolID?: IDType | null;
  subjectID?: IDType | null;
  classID?: IDType | null;

  coefficient?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
}

export interface ClassListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  specialtyID?: IDType | null;
}

export interface ClassSubjectListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  classID?: IDType | null;
  subjectID?: IDType | null;
}

// Format request
export function formatClassFormToRequest(item?: ClassRequest) {
  if (!item) {
    return;
  }
  const tempProgram = castFileToStringUrl(
    item.program as UploadFile[] | undefined,
  );
  const tempRequirements = castFileToStringUrl(
    item.requirements as UploadFile[] | undefined,
  );

  const newItem: ClassRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    specialtyID:
      `${item.specialtyID ?? ""}`.length > 0
        ? parseInt(`${item.specialtyID}`)
        : undefined,
    fees:
      `${item.fees ?? ""}`.length > 0 ? parseFloat(`${item.fees}`) : undefined,

    program: tempProgram.length > 0 ? tempProgram[0] : undefined,
    requirements: tempRequirements.length > 0 ? tempRequirements[0] : undefined,
  };
  return newItem;
}

export function formatClassSubjectFormToRequest(item?: ClassSubjectRequest) {
  if (!item) {
    return;
  }
  const tempProgram = castFileToStringUrl(
    item.program as UploadFile[] | undefined,
  );
  const tempRequirements = castFileToStringUrl(
    item.requirements as UploadFile[] | undefined,
  );

  const newItem: ClassSubjectRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    subjectID:
      `${item.subjectID ?? ""}`.length > 0
        ? parseInt(`${item.subjectID}`)
        : undefined,
    classID:
      `${item.classID ?? ""}`.length > 0
        ? parseInt(`${item.classID}`)
        : undefined,
    coefficient:
      `${item.coefficient ?? ""}`.length > 0
        ? parseInt(`${item.coefficient}`)
        : undefined,

    program: tempProgram.length > 0 ? tempProgram[0] : undefined,
    requirements: tempRequirements.length > 0 ? tempRequirements[0] : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareClassRequestToResponse(
  a?: ClassRequest,
  b?: ClassResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatClassFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.specialtyID === b.specialty?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description &&
    tempReq?.fees === b.fees &&
    tempReq?.program === b.program &&
    tempReq?.requirements === b.requirements &&
    tempReq?.isValid === b.isValid
  );
}

export function compareClassSubjectRequestToResponse(
  a?: ClassSubjectRequest,
  b?: ClassSubjectResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatClassSubjectFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.subjectID === b.subject?.id &&
    tempReq?.classID === b.class?.id &&
    tempReq?.coefficient === b.coefficient &&
    tempReq?.program === b.program &&
    tempReq?.requirements === b.requirements &&
    tempReq?.isValid === b.isValid
  );
}
