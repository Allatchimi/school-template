import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { DepartmentResponse } from "../department/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";

export interface DomainResponse extends BaseResponse {
  school?: SchoolResponse | null;
  department?: DepartmentResponse | null;
  name?: string | null;
  description?: string | null;
}

export interface DomainListResponse extends BasePaginatedResponse {
  data?: DomainResponse[] | null;
}
