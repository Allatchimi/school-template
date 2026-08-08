import {
  BaseResponse,
  DateType,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "../school/response";

export interface YearResponse extends BaseResponse {
  school?: SchoolResponse | null;
  name?: string | null;
  startDate?: DateType | null;
  endDate?: DateType | null;
}

export interface YearListResponse extends BasePaginatedResponse {
  data?: YearResponse[] | null;
}
