import {
  BaseResponse,
  BasePaginatedResponse,
  IDType,
} from "@/types/http/base-response";
import { ClassSubjectResponse } from "../../highschool/class/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";
import { StudentResponse } from "../student/response";
import { YearResponse } from "../year/response";

export interface QuizResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  classSubject?: ClassSubjectResponse | null;
  unit?: UnitResponse | null;
  questions?:
    | {
        question?: QuizQuestionResponse | null;
        options?: QuizQuestionOptionResponse[] | null;
      }[]
    | null;

  title?: string | null;
  description?: string | null;
  status?: string | null;
}
export interface QuizQuestionResponse extends BaseResponse {
  quizID?: IDType | null;
  solution?: QuizQuestionOptionResponse | null;

  title?: string | null;
  description?: string | null;
}
export interface QuizQuestionOptionResponse extends BaseResponse {
  quizQuestionID?: IDType | null;

  title?: string | null;
  description?: string | null;
}

export interface QuizAnswerResponse extends BaseResponse {
  quizID?: IDType | null;
  student?: StudentResponse | null;
  answers?:
    | {
        question?: QuizQuestionResponse | null;
        answer?: QuizQuestionOptionResponse | null;
      }[]
    | null;
}

export interface QuizListResponse extends BasePaginatedResponse {
  data?: QuizResponse[] | null;
}

export interface QuizAnswerListResponse extends BasePaginatedResponse {
  data?: QuizAnswerResponse[] | null;
}

export interface QuizResultListResponse extends BasePaginatedResponse {
  data?:
    | {
        student?: StudentResponse | null;
        result?: number | null;
      }[]
    | null;
}
