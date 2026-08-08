import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { SpecialtyResponse } from "../specialty/response";
import {
  BasePaginatedResponse,
  BaseResponse,
  DateType,
} from "@/types/http/base-response";
import { SubjectResponse } from "../subject/response";

export interface ClassResponse extends BaseResponse {
  school?: SchoolResponse | null;
  specialty?: SpecialtyResponse | null;

  name?: string | null;
  description?: string | null;
  fees?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
  invalidDate?: DateType | null;
}
export interface ClassSubjectResponse extends BaseResponse {
  school?: SchoolResponse | null;
  subject?: SubjectResponse | null;
  class?: ClassResponse | null;

  coefficient?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
  invalidDate?: DateType | null;
}

export interface ClassListResponse extends BasePaginatedResponse {
  data?: ClassResponse[] | null;
}

export interface ClassSubjectListResponse extends BasePaginatedResponse {
  data?: ClassSubjectResponse[] | null;
}
