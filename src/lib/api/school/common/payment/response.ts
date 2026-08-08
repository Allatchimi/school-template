import {
  BaseResponse,
  DateType,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "../school/response";
import { StudentEnrollResponse } from "../student/response";

export interface PaymentEnrollResponse extends BaseResponse {
  school?: SchoolResponse | null;
  studentEnroll?: StudentEnrollResponse | null;

  amount?: number | null;
  currency?: string | null;
  date?: DateType | null;
  method?: string | null;
  status?: string | null;
  message?: string | null;
}

export interface PaymentEnrollListResponse extends BasePaginatedResponse {
  data?: PaymentEnrollResponse[] | null;
}
