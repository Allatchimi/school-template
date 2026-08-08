import { UserResponse } from "@/lib/api/user/user/response";
import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { ClassSubjectResponse } from "../../highschool/class/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";
import { YearResponse } from "../year/response";

export interface TeacherResponse extends BaseResponse {
  school?: SchoolResponse | null;
  user?: UserResponse | null;
  
  uid?: string | null;
}
export interface TeacherClassSubjectUnitResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  classSubject?: ClassSubjectResponse | null;
  unit?: UnitResponse | null;
  teacher?: TeacherResponse | null;
}

export interface TeacherListResponse extends BasePaginatedResponse {
  data?: TeacherResponse[] | null;
}

export interface TeacherClassSubjectUnitListResponse
  extends BasePaginatedResponse {
  data?: TeacherClassSubjectUnitResponse[] | null;
}
