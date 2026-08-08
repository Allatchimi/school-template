import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import {
  ReportConfigResponse,
  ReportCorrespondenceResponse,
  ReportGradeResponse,
} from "./response";

export interface ReportEntryRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;

  periodType?: string | null;
  quarterID?: IDType | null;
  sequenceID?: IDType | null;
  semesterID?: IDType | null;
}

export interface ReportGradeRequest extends BaseRequest {
  schoolID?: IDType | null;

  type?: string | null;
  name?: string | null;
  description?: string | null;
  minimum?: number | null;
  maximum?: number | null;
  includeMinimum?: boolean | null;
  includeMaximum?: boolean | null;
}

export interface ReportCorrespondenceRequest extends BaseRequest {
  schoolID?: IDType | null;

  minimum?: number | null;
  maximum?: number | null;
  includeMinimum?: boolean | null;
  includeMaximum?: boolean | null;
  newScore?: number | null;
}

export interface ReportConfigRequest extends BaseRequest {
  schoolID?: IDType | null;
  reportGradeToFailID?: IDType | null;

  notationAverage?: number | null;
  notationReport?: number | null;
  minimumRequiredScoreToPromote?: number | null;
  onlyFailedExams?: boolean | null;
}

export interface ReportEntryListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  sequenceID?: IDType | null;
  unitID?: IDType | null;
  semesterID?: IDType | null;
  studentID?: IDType | null;
}

export interface ReportGradeListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  type?: string | null;
}

export interface ReportCorrespondenceListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
}

export interface ReportConfigListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
}

export interface ReportAverageListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;
  studentID?: IDType | null;
  periodType?: string | null;
  periodName?: string | null;
}

export interface ReportTableListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;
  studentID?: IDType | null;
  periodType?: string | null;
  periodName?: string | null;
}

// Format request
export function formatReportEntryFormToRequest(item?: ReportEntryRequest) {
  if (!item) {
    return;
  }
  const newItem: ReportEntryRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    yearID:
      `${item.yearID ?? ""}`.length > 0
        ? parseInt(`${item.yearID}`)
        : undefined,
    classID:
      `${item.classID ?? ""}`.length > 0
        ? parseInt(`${item.classID}`)
        : undefined,
    levelDomainID:
      `${item.levelDomainID ?? ""}`.length > 0
        ? parseInt(`${item.levelDomainID}`)
        : undefined,
    quarterID:
      `${item.quarterID ?? ""}`.length > 0
        ? parseInt(`${item.quarterID}`)
        : undefined,
    sequenceID:
      `${item.sequenceID ?? ""}`.length > 0
        ? parseInt(`${item.sequenceID}`)
        : undefined,
    semesterID:
      `${item.semesterID ?? ""}`.length > 0
        ? parseInt(`${item.semesterID}`)
        : undefined,
  };
  return newItem;
}
export function formatReportGradeFormToRequest(item?: ReportGradeRequest) {
  if (!item) {
    return;
  }
  const newItem: ReportGradeRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    minimum:
      `${item.minimum ?? ""}`.length > 0
        ? parseFloat(`${item.minimum}`)
        : undefined,
    maximum:
      `${item.maximum ?? ""}`.length > 0
        ? parseFloat(`${item.maximum}`)
        : undefined,
  };
  return newItem;
}
export function formatReportCorrespondenceFormToRequest(
  item?: ReportCorrespondenceRequest
) {
  if (!item) {
    return;
  }
  const newItem: ReportCorrespondenceRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    minimum:
      `${item.minimum ?? ""}`.length > 0
        ? parseFloat(`${item.minimum}`)
        : undefined,
    maximum:
      `${item.maximum ?? ""}`.length > 0
        ? parseFloat(`${item.maximum}`)
        : undefined,
    newScore:
      `${item.newScore ?? ""}`.length > 0
        ? parseFloat(`${item.newScore}`)
        : undefined,
  };
  return newItem;
}
export function formatReportConfigFormToRequest(item?: ReportConfigRequest) {
  if (!item) {
    return;
  }
  const newItem: ReportConfigRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    reportGradeToFailID:
      `${item.reportGradeToFailID ?? ""}`.length > 0
        ? parseInt(`${item.reportGradeToFailID}`)
        : undefined,
    notationAverage:
      `${item.notationAverage ?? ""}`.length > 0
        ? parseFloat(`${item.notationAverage}`)
        : undefined,
    notationReport:
      `${item.notationReport ?? ""}`.length > 0
        ? parseFloat(`${item.notationReport}`)
        : undefined,
    minimumRequiredScoreToPromote:
      `${item.minimumRequiredScoreToPromote ?? ""}`.length > 0
        ? parseFloat(`${item.minimumRequiredScoreToPromote}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareReportGradeRequestToResponse(
  a?: ReportGradeRequest,
  b?: ReportGradeResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatReportGradeFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.type === b.type &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description &&
    tempReq?.minimum === b.minimum &&
    tempReq?.maximum === b.maximum &&
    tempReq?.includeMinimum === b.includeMinimum &&
    tempReq?.includeMaximum === b.includeMaximum
  );
}
export function compareReportCorrespondenceRequestToResponse(
  a?: ReportCorrespondenceRequest,
  b?: ReportCorrespondenceResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatReportCorrespondenceFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.minimum === b.minimum &&
    tempReq?.maximum === b.maximum &&
    tempReq?.includeMinimum === b.includeMinimum &&
    tempReq?.includeMaximum === b.includeMaximum &&
    tempReq?.newScore === b.newScore
  );
}
export function compareReportConfigRequestToResponse(
  a?: ReportConfigRequest,
  b?: ReportConfigResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatReportConfigFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.reportGradeToFailID === b.reportGradeToFail?.id &&
    tempReq?.notationAverage === b.notationAverage &&
    tempReq?.notationReport === b.notationReport &&
    tempReq?.minimumRequiredScoreToPromote === b.minimumRequiredScoreToPromote &&
    tempReq?.onlyFailedExams === b.onlyFailedExams
  );
}
