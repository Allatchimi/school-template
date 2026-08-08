import { UserResponse } from "@/lib/api/user/user/response";
import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { StudentResponse } from "../student/response";
import { SchoolResponse } from "../school/response";

export interface ParentResponse extends BaseResponse {
  school?: SchoolResponse | null;
  user?: UserResponse | null;
}

export interface ParentStudentResponse extends BaseResponse {
  school?: SchoolResponse | null;
  parent?: ParentResponse | null;
  student?: StudentResponse | null;
}

export interface ParentListResponse extends BasePaginatedResponse {
  data?: ParentResponse[] | null;
}

export interface ParentStudentListResponse extends BasePaginatedResponse {
  data?: ParentStudentResponse[] | null;
}
