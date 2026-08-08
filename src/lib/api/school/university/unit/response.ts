import {
  BasePaginatedResponse,
  BaseResponse,
  DateType,
} from "@/types/http/base-response";
import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { SemesterResponse } from "../semester/response";
import { LevelDomainResponse } from "../level/response";

export interface UnitResponse extends BaseResponse {
  school?: SchoolResponse | null;
  levelDomain?: LevelDomainResponse | null;
  semester?: SemesterResponse | null;

  name?: string | null;
  description?: string | null;
  credit?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
  invalidDate?: DateType | null;
}

export interface UnitListResponse extends BasePaginatedResponse {
  data?: UnitResponse[] | null;
}
