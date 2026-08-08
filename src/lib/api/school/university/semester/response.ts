import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "@/lib/api/school/common/school/response";

export interface SemesterResponse extends BaseResponse {
  school?: SchoolResponse | null;

  name?: string | null;
  description?: string | null;
}

export interface SemesterListResponse extends BasePaginatedResponse {
  data?: SemesterResponse[] | null;
}
