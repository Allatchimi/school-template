import { BaseRequest } from "@/types/http/base-request";
import { IDType, DateType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { PaymentEnrollResponse } from "./response";

export interface PaymentEnrollRequest extends BaseRequest {
  schoolID?: IDType | null;
  studentEnrollID?: IDType | null;

  amount?: number | null;
  currency?: string | null;
  date?: DateType | null;
  method?: string | null;
  status?: string | null;
  message?: string | null;
}

export interface PaymentEnrollListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  studentEnrollID?: IDType | null;
  studentID?: IDType | null;
}

// Format request
export function formatPaymentFormToRequest(item?: PaymentEnrollRequest) {
  if (!item) {
    return;
  }
  const newItem: PaymentEnrollRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    studentEnrollID:
      `${item.studentEnrollID ?? ""}`.length > 0
        ? parseInt(`${item.studentEnrollID}`)
        : undefined,
    amount:
      `${item.amount ?? ""}`.length > 0
        ? parseFloat(`${item.amount}`)
        : undefined,
  };
  return newItem;
}

// Compare request to response
export function comparePaymentRequestToResponse(
  a?: PaymentEnrollRequest,
  b?: PaymentEnrollResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatPaymentFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.studentEnrollID === b.studentEnroll?.id &&
    tempReq?.amount === b.amount &&
    tempReq?.currency === b.currency &&
    tempReq?.date === b.date &&
    tempReq?.method === b.method &&
    tempReq?.status === b.status &&
    tempReq?.message === b.message
  );
}
