import { BaseRequest } from "@/types/http/base-request";
import { IDType, DateType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import {
  StudentResponse,
  StudentEnrollResponse,
  StudentPreEnrollResponse,
} from "./response";
import { UserInfoRequest } from "@/lib/api/user/user/request";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface StudentRequest extends BaseRequest {
  schoolID?: IDType | null;

  uid?: string | null;
  autoGenerateEmail?: boolean | null;
  email?: string | null;
  phoneNumber?: number | null;
  status?: string | null;

  info?: UserInfoRequest | null;
}

export interface StudentEnrollRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;
  studentID?: IDType | null;
}

export interface StudentPreEnrollRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;

  email?: string | null;
  phoneNumber?: number | null;
  message?: string | null;
  gender?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: DateType | null;
  birthLocation?: string | null;
  document1?: string | null;
  document2?: string | null;
  document3?: string | null;
  document4?: string | null;
  document5?: string | null;
}

export interface StudentPreEnrollStatusRequest extends BaseRequest {
  status?: string | null;
  statusFeedback?: number | null;
}

export interface StudentListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  examID?: IDType | null;
}

export interface StudentEnrollListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;
}

export interface StudentPreEnrollListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;
}

// Format request
export function formatStudentFormToRequest(item?: StudentRequest) {
  if (!item) {
    return;
  }
  const tempImage = castFileToStringUrl(
    item.info?.image as UploadFile[] | undefined
  );

  const newItem: StudentRequest = {
    ...item,
    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    phoneNumber:
      `${item.phoneNumber ?? ""}`.length > 0
        ? parseInt(`${item.phoneNumber}`)
        : undefined,
    info: {
      ...item.info,
      image: tempImage.length > 0 ? tempImage[0] : undefined,
    },
  };
  return newItem;
}

export function formatStudentEnrollFormToRequest(item?: StudentEnrollRequest) {
  if (!item) {
    return;
  }
  const newItem: StudentEnrollRequest = {
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
    studentID:
      `${item.studentID ?? ""}`.length > 0
        ? parseInt(`${item.studentID}`)
        : undefined,
  };
  return newItem;
}

export function formatStudentPreEnrollFormToRequest(
  item?: StudentPreEnrollRequest
) {
  if (!item) {
    return;
  }
  const tempDocuments = castFileToStringUrl(
    item.document1 as UploadFile[] | undefined
  );

  const newItem: StudentPreEnrollRequest = {
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
    phoneNumber:
      `${item.phoneNumber ?? ""}`.length > 0
        ? parseInt(`${item.phoneNumber}`)
        : undefined,

    document1: tempDocuments.length > 0 ? tempDocuments[0] : undefined,
    document2: tempDocuments.length > 1 ? tempDocuments[1] : undefined,
    document3: tempDocuments.length > 2 ? tempDocuments[2] : undefined,
    document4: tempDocuments.length > 3 ? tempDocuments[3] : undefined,
    document5: tempDocuments.length > 4 ? tempDocuments[4] : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareStudentRequestToResponse(
  a?: StudentRequest,
  b?: StudentResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatStudentFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.uid === b.uid &&
    tempReq?.email === b.user?.email &&
    tempReq?.phoneNumber === b.user?.phoneNumber &&
    tempReq?.status === b.user?.status &&
    tempReq?.info?.username === b.user?.info?.username &&
    tempReq?.info?.firstName === b.user?.info?.firstName &&
    tempReq?.info?.lastName === b.user?.info?.lastName &&
    tempReq?.info?.birthday === b.user?.info?.birthday &&
    tempReq?.info?.birthLocation === b.user?.info?.birthLocation &&
    tempReq?.info?.address === b.user?.info?.address &&
    tempReq?.info?.language === b.user?.info?.language &&
    tempReq?.info?.image === b.user?.info?.image
  );
}
export function compareStudentEnrollRequestToResponse(
  a?: StudentEnrollRequest,
  b?: StudentEnrollResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatStudentEnrollFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.yearID === b.year?.id &&
    tempReq?.classID === b.class?.id &&
    tempReq?.levelDomainID === b.levelDomain?.id &&
    tempReq?.studentID === b.student?.id
  );
}
export function compareStudentPreEnrollRequestToResponse(
  a?: StudentPreEnrollRequest,
  b?: StudentPreEnrollResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatStudentPreEnrollFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.yearID === b.year?.id &&
    tempReq?.classID === b.class?.id &&
    tempReq?.levelDomainID === b.levelDomain?.id &&
    tempReq?.email === b.email &&
    tempReq?.phoneNumber === b.phoneNumber &&
    tempReq?.message === b.message &&
    tempReq?.gender === b.gender &&
    tempReq?.firstName === b.firstName &&
    tempReq?.lastName === b.lastName &&
    tempReq?.birthday === b.birthday &&
    tempReq?.birthLocation === b.birthLocation &&
    tempReq?.document1 === b.document1 &&
    tempReq?.document2 === b.document2 &&
    tempReq?.document3 === b.document3 &&
    tempReq?.document4 === b.document4 &&
    tempReq?.document5 === b.document5
  );
}
