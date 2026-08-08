import { FilterRequest } from "../../../../../types/http/filter/request";
import { PaginationRequest } from "../../../../../types/http/pagination/request";
import { BaseRequest } from "../../../../../types/http/base-request";
import { IDType } from "../../../../../types/http/base-response";
import { TeacherClassSubjectUnitResponse, TeacherResponse } from "./response";
import { UserInfoRequest } from "@/lib/api/user/user/request";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface TeacherRequest extends BaseRequest {
  schoolID?: IDType | null;

  uid?: string | null;
  autoGenerateEmail?: boolean | null;
  email?: string | null;
  phoneNumber?: number | null;
  status?: string | null;
  info?: UserInfoRequest | null;
}

export interface TeacherClassSubjectUnitRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
  teacherID?: IDType | null;
}

export interface TeacherListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

export interface TeacherClassSubjectUnitListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
  classID?: IDType | null;
  levelDomainID?: IDType | null;
}

// Format request
export function formatTeacherFormToRequest(item?: TeacherRequest) {
  if (!item) {
    return;
  }
  const tempImage = castFileToStringUrl(
    item.info?.image as UploadFile[] | undefined
  );

  const newItem: TeacherRequest = {
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

export function formatTeacherClassSubjectUnitFormToRequest(
  item?: TeacherClassSubjectUnitRequest
) {
  if (!item) {
    return;
  }
  const newItem: TeacherClassSubjectUnitRequest = {
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
    unitID:
      `${item.unitID ?? ""}`.length > 0
        ? parseInt(`${item.unitID}`)
        : undefined,
    teacherID:
      `${item.teacherID ?? ""}`.length > 0
        ? parseInt(`${item.teacherID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareTeacherRequestToResponse(
  a?: TeacherRequest,
  b?: TeacherResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatTeacherFormToRequest(a);

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
export function compareTeacherClassSubjectUnitRequestToResponse(
  a?: TeacherClassSubjectUnitRequest,
  b?: TeacherClassSubjectUnitResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatTeacherClassSubjectUnitFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.yearID === b.year?.id &&
    tempReq?.classSubjectID === b.classSubject?.id &&
    tempReq?.unitID === b.unit?.id &&
    tempReq?.teacherID === b.teacher?.id
  );
}
