import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { ExamResponse } from "../exam/response";
import { StudentResponse } from "../student/response";
import { SchoolResponse } from "../school/response";

export interface ResultResponse extends BaseResponse {
  school?: SchoolResponse | null;
  exam?: ExamResponse | null;
  student?: StudentResponse | null;

  score?: number | null;
}

export interface ResultTableResponse extends BaseResponse {
  school?: SchoolResponse | null;
  exam?: ExamResponse | null;

  status?: string | null;
}

export interface ResultListResponse extends BasePaginatedResponse {
  data?: ResultResponse[] | null;
}

export interface ResultTableListResponse extends BasePaginatedResponse {
  data?: ResultTableResponse[] | null;
}
