import { BaseRequest } from "@/types/http/base-request";
import { IDType, DateType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { YearResponse } from "./response";

export interface YearRequest extends BaseRequest {
  schoolID?: IDType | null;
  startDate?: DateType | null;
  endDate?: DateType | null;
}

export interface YearListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatYearFormToRequest(item?: YearRequest) {
  if (!item) {
    return;
  }
  const newItem: YearRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareYearRequestToResponse(
  a?: YearRequest,
  b?: YearResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatYearFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.startDate === b.startDate &&
    tempReq?.endDate === b.endDate
  );
}
