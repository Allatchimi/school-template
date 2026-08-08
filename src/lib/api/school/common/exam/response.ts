import {
  BaseResponse,
  BasePaginatedResponse,
  DateType,
} from "@/types/http/base-response";
import { ClassSubjectResponse } from "../../highschool/class/response";
import { SequenceResponse } from "../../highschool/sequence/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";
import { YearResponse } from "../year/response";

export interface ExamResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  classSubject?: ClassSubjectResponse | null;
  sequence?: SequenceResponse | null;
  unit?: UnitResponse | null;
  type?: ExamTypeResponse | null;

  status?: string | null;
  notation?: number | null;
  percentage?: number | null;
  description?: string | null;
  locationType?: string | null;
  locationDetails?: string | null;
  requirements?: string | null;
  allowedItems?: string | null;
  startDate?: DateType | null;
  endDate?: DateType | null;

  isRetry?: boolean | null;
  retryCount?: number | null;
}

export interface ExamTypeResponse extends BaseResponse {
  school?: SchoolResponse | null;

  name?: string | null;
  description?: string | null;
}

export interface ExamListResponse extends BasePaginatedResponse {
  data?: ExamResponse[] | null;
}

export interface ExamTypeListResponse extends BasePaginatedResponse {
  data?: ExamTypeResponse[] | null;
}
