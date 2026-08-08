import {
  BasePaginatedResponse,
  BaseResponse,
  DateType,
} from "@/types/http/base-response";
import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { DomainResponse } from "../domain/response";

export interface LevelResponse extends BaseResponse {
  school?: SchoolResponse | null;
  name?: string | null;
  description?: string | null;
}
export interface LevelDomainResponse extends BaseResponse {
  school?: SchoolResponse | null;
  level?: LevelResponse | null;
  domain?: DomainResponse | null;

  fees?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
  invalidDate?: DateType | null;
}

export interface LevelListResponse extends BasePaginatedResponse {
  data?: LevelResponse[] | null;
}

export interface LevelDomainListResponse extends BasePaginatedResponse {
  data?: LevelDomainResponse[] | null;
}
