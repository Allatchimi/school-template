import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import {
  ClassResponse,
  ClassSubjectResponse,
} from "../../highschool/class/response";
import { SequenceResponse } from "../../highschool/sequence/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";
import { YearResponse } from "../year/response";
import { StudentResponse } from "../student/response";
import { LevelDomainResponse } from "../../university/level/response";

export interface ReportEntryResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  classSubject?: ClassSubjectResponse | null;
  sequence?: SequenceResponse | null;
  unit?: UnitResponse | null;
  student?: StudentResponse | null;

  coefficient?: number | null;
  credit?: number | null;
  score?: number | null;
  notation?: number | null;
  isRetry?: boolean | null;
  retryCount?: number | null;
  retryDetails?: string | null;
}

export interface ReportGradeResponse extends BaseResponse {
  school?: SchoolResponse | null;

  type?: string | null;
  name?: string | null;
  description?: string | null;
  minimum?: number | null;
  maximum?: number | null;
  includeMinimum?: boolean | null;
  includeMaximum?: boolean | null;
}

export interface ReportCorrespondenceResponse extends BaseResponse {
  school?: SchoolResponse | null;

  minimum?: number | null;
  maximum?: number | null;
  includeMinimum?: boolean | null;
  includeMaximum?: boolean | null;
  newScore?: number | null;
}

export interface ReportConfigResponse extends BaseResponse {
  school?: SchoolResponse | null;
  reportGradeToFail?: ReportGradeResponse | null;

  notationAverage?: number | null;
  notationReport?: number | null;
  minimumRequiredScoreToPromote?: number | null;
  onlyFailedExams?: boolean | null;
}

export interface ReportAverageResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  class?: ClassResponse | null;
  levelDomain?: LevelDomainResponse | null;
  student?: StudentResponse | null;

  periodType?: string | null;
  periodName?: string | null;
  score?: number | null;
  notation?: number | null;
  gradeName?: string | null;
  gradeDescription?: string | null;
  rank?: number | null;
  isSuccessful?: boolean | null;
  totalCreditCoefficient?: number | null;
  validatedCreditCoefficient?: number | null;
}

export interface ReportTableResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  class?: ClassResponse | null;
  levelDomain?: LevelDomainResponse | null;

  periodType?: string | null;
  periodName?: string | null;
  status?: string | null;
}

export interface ReportEntryListResponse extends BasePaginatedResponse {
  data?: ReportEntryResponse[] | null;
}

export interface ReportGradeListResponse extends BasePaginatedResponse {
  data?: ReportGradeResponse[] | null;
}

export interface ReportCorrespondenceListResponse
  extends BasePaginatedResponse {
  data?: ReportCorrespondenceResponse[] | null;
}

export interface ReportConfigListResponse extends BasePaginatedResponse {
  data?: ReportConfigResponse[] | null;
}

export interface ReportAverageListResponse extends BasePaginatedResponse {
  data?: ReportAverageResponse[] | null;
}

export interface ReportTableListResponse extends BasePaginatedResponse {
  data?: ReportTableResponse[] | null;
}
