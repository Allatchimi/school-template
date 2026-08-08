import { FilterResponse } from "./filter/response";
import { PaginationResponse } from "./pagination/response";
import dayjs from "dayjs";

export type IDType = number;
export type DateType = Date | dayjs.Dayjs | string;
export type TimeType = Date | dayjs.Dayjs | string;

export interface DefaultResponse {
  message?: string | null;
}
export interface BaseResponse {
  id?: IDType | null;
  createdAt?: DateType | null;
  updatedAt?: DateType | null;
}
export interface BasePaginatedResponse {
  pagination?: PaginationResponse | null;
  filter?: FilterResponse | null;
}
