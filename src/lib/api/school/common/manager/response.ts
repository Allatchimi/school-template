import { UserResponse } from "@/lib/api/user/user/response";
import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "../school/response";

export interface ManagerResponse extends BaseResponse {
  user?: UserResponse | null;
  school?: SchoolResponse | null;
  uid?: string | null;
}
export interface ManagerListResponse extends BasePaginatedResponse {
  data?: ManagerResponse[] | null;
}
