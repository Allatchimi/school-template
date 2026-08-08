import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  PaymentEnrollRequest,
  PaymentEnrollListRequest,
  formatPaymentFormToRequest,
} from "./request";
import { PaymentEnrollListResponse, PaymentEnrollResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/payments`;

// Payment
export async function getPayment(id: IDType) {
  return GET<PaymentEnrollResponse, PaymentEnrollRequest>(
    `${PATH_GROUP}/${id}`,
  );
}
export async function getPaymentList(
  params: PaymentEnrollListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<PaymentEnrollListResponse, PaymentEnrollListRequest>(
    `${PATH_GROUP}`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function postPayment(item: PaymentEnrollRequest) {
  return POST<PaymentEnrollResponse, PaymentEnrollRequest>(
    `${PATH_GROUP}`,
    formatPaymentFormToRequest(item),
  );
}
export async function updatePayment(item: PaymentEnrollRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<PaymentEnrollResponse, PaymentEnrollRequest>(
    `${PATH_GROUP}/${id}`,
    formatPaymentFormToRequest(item),
  );
}
export async function deletePayment(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultiplePayment(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
