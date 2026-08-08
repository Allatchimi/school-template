import { UserResponse } from "@/lib/api/user/user/response";
import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "../school/response";

export interface DirectorResponse extends BaseResponse {
  user?: UserResponse | null;
  school?: SchoolResponse | null;
}

export interface DirectorListResponse extends BasePaginatedResponse {
  data?: DirectorResponse[] | null;
}
