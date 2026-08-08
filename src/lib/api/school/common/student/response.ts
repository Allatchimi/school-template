import { UserResponse } from "@/lib/api/user/user/response";
import {
  BaseResponse,
  BasePaginatedResponse,
  DateType,
} from "@/types/http/base-response";
import { ClassResponse } from "../../highschool/class/response";
import { LevelDomainResponse } from "../../university/level/response";
import { SchoolResponse } from "../school/response";
import { YearResponse } from "../year/response";

export interface StudentResponse extends BaseResponse {
  user?: UserResponse | null;
  school?: SchoolResponse | null;
  uid?: string | null;
}
export interface StudentEnrollResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  class?: ClassResponse | null;
  levelDomain?: LevelDomainResponse | null;
  student?: StudentResponse | null;

  origin?: string | null;
}
export interface StudentPreEnrollResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  class?: ClassResponse | null;
  levelDomain?: LevelDomainResponse | null;

  status?: string | null;
  statusFeedback?: string | null;
  email?: string | null;
  phoneNumber?: number | null;
  message?: string | null;
  gender?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: DateType | null;
  birthLocation?: string | null;
  document1?: string | null;
  document2?: string | null;
  document3?: string | null;
  document4?: string | null;
  document5?: string | null;
}

export interface StudentListResponse extends BasePaginatedResponse {
  data?: StudentResponse[] | null;
}

export interface StudentEnrollListResponse extends BasePaginatedResponse {
  data?: StudentEnrollResponse[] | null;
}

export interface StudentPreEnrollListResponse extends BasePaginatedResponse {
  data?: StudentPreEnrollResponse[] | null;
}
