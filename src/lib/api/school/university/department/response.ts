import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { FacultyResponse } from "../faculty/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";

export interface DepartmentResponse extends BaseResponse {
  school?: SchoolResponse | null;
  faculty?: FacultyResponse | null;
  name?: string | null;
  description?: string | null;
}

export interface DepartmentListResponse extends BasePaginatedResponse {
  data?: DepartmentResponse[] | null;
}
