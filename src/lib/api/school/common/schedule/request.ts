import { BaseRequest } from "@/types/http/base-request";
import { DateType, IDType, TimeType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { ScheduleResponse } from "./response";
import { formatTimeShort } from "@/helpers/date/format";

export interface ScheduleRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;

  isCommon?: boolean | null;
  type?: string | null;
  description?: string | null;
  dayOfTheWeek?: string | null;
  repeatCount?: number | null;
  repeatType?: string | null;
  startTime?: TimeType | null;
  endTime?: TimeType | null;
  startCountDate?: DateType | null;
  isValid?: boolean | null;
}

export interface ScheduleListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
  studentID?: IDType | null;
  teacherID?: IDType | null;

  type?: string | null;
}

// Format request
export function formatScheduleFormToRequest(item?: ScheduleRequest) {
  if (!item) {
    return;
  }
  const newItem: ScheduleRequest = {
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
    repeatCount:
      `${item.repeatCount ?? ""}`.length > 0
        ? parseInt(`${item.repeatCount}`)
        : undefined,

    startTime:
      `${item.startTime ?? ""}`.length > 0
        ? formatTimeShort(`${item.startTime}`)
        : undefined,
    endTime:
      `${item.endTime ?? ""}`.length > 0
        ? formatTimeShort(`${item.endTime}`)
        : undefined,
  };
  if (item?.isCommon === true) {
    newItem.classSubjectID = undefined;
    newItem.unitID = undefined;
  }
  return newItem;
}

// Compare request to response
export function compareScheduleRequestToResponse(
  a?: ScheduleRequest,
  b?: ScheduleResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatScheduleFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.yearID === b.year?.id &&
    (tempReq?.classSubjectID ?? 0) === (b.classSubject?.id ?? 0) &&
    (tempReq?.unitID ?? 0) === (b.unit?.id ?? 0) &&
    tempReq?.isCommon === b.isCommon &&
    tempReq?.type === b.type &&
    tempReq?.description === b.description &&
    tempReq?.dayOfTheWeek === b.dayOfTheWeek &&
    tempReq?.repeatCount === b.repeatCount &&
    tempReq?.repeatType === b.repeatType &&
    tempReq?.startTime === b.startTime &&
    tempReq?.endTime === b.endTime &&
    tempReq?.startCountDate === b.startCountDate &&
    tempReq?.isValid === b.isValid
  );
}
