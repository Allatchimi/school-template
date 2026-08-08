import { SchoolResponse } from "@/lib/api/school/common/school/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";

export interface SubjectResponse extends BaseResponse {
  school?: SchoolResponse | null;

  name?: string | null;
  description?: string | null;
}

export interface SubjectListResponse extends BasePaginatedResponse {
  data?: SubjectResponse[] | null;
}
