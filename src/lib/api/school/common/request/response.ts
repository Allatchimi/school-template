import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { ClassSubjectResponse } from "../../highschool/class/response";
import { SequenceResponse } from "../../highschool/sequence/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";
import { YearResponse } from "../year/response";
import { StudentResponse } from "../student/response";

export interface RequestResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  classSubject?: ClassSubjectResponse | null;
  sequence?: SequenceResponse | null;
  unit?: UnitResponse | null;
  student?: StudentResponse | null;

  status?: string | null;
  statusFeedback?: string | null;
  audience?: string | null;
  title?: string | null;
  message?: string | null;
  document1?: string | null;
  document2?: string | null;
  document3?: string | null;
  document4?: string | null;
  document5?: string | null;
}

export interface RequestListResponse extends BasePaginatedResponse {
  data?: RequestResponse[] | null;
}
