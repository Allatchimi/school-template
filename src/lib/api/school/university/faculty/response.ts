import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "@/lib/api/school/common/school/response";

export interface FacultyResponse extends BaseResponse {
  school?: SchoolResponse | null;
  name?: string | null;
  description?: string | null;
}

export interface FacultyListResponse extends BasePaginatedResponse {
  data?: FacultyResponse[] | null;
}
