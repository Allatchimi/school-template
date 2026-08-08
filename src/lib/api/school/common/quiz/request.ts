import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import {
  QuizResponse,
  QuizQuestionResponse,
  QuizQuestionOptionResponse,
} from "./response";

export interface QuizRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;

  title?: string | null;
  description?: string | null;
  status?: string | null;
  questions?:
    | {
        question?: { title?: string | null; description?: string | null };
        options?:
          | {
              title?: string | null;
              description?: string | null;
            }[]
          | null;
      }[]
    | null;
}

export interface QuizSolutionRequest extends BaseRequest {
  solutions?:
    | {
        questionID?: IDType | null;
        optionID?: IDType | null;
      }[]
    | null;
}

export interface QuizAnswerRequest extends BaseRequest {
  studentID?: IDType | null;
  answers?:
    | {
        questionID?: IDType | null;
        optionID?: IDType | null;
      }[]
    | null;
}

export interface QuizListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
}

export interface QuizAnswerListRequest
  extends FilterRequest,
    PaginationRequest {
  quizID?: IDType | null;
  StudentID?: IDType | null;
}

export interface QuizResultListRequest
  extends FilterRequest,
    PaginationRequest {
  quizID?: IDType | null;
}

// Format request
export function formatQuizFormToRequest(item?: QuizRequest) {
  if (!item) {
    return;
  }
  const newItem: QuizRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    yearID:
      `${item.yearID ?? ""}`.length > 0
        ? parseInt(`${item.yearID}`)
        : undefined,
    classSubjectID:
      `${item.classSubjectID ?? ""}`.length > 0
        ? parseInt(`${item.classSubjectID}`)
        : undefined,
    unitID:
      `${item.unitID ?? ""}`.length > 0
        ? parseInt(`${item.unitID}`)
        : undefined,
  };
  return newItem;
}

export function formatQuizSolutionFormToRequest(item?: QuizSolutionRequest) {
  if (!item) {
    return;
  }
  const newItem: QuizSolutionRequest = {
    ...item,

    solutions: item.solutions?.map((answer) => {
      return {
        questionID:
          `${answer.questionID ?? ""}`.length > 0
            ? parseInt(`${answer.questionID}`)
            : undefined,
        optionID:
          `${answer.optionID ?? ""}`.length > 0
            ? parseInt(`${answer.optionID}`)
            : undefined,
      };
    }),
  };
  return newItem;
}

export function formatQuizAnswerFormToRequest(item?: QuizAnswerRequest) {
  if (!item) {
    return;
  }
  const newItem: QuizAnswerRequest = {
    ...item,

    answers: item.answers?.map((answer) => {
      return {
        questionID:
          `${answer.questionID ?? ""}`.length > 0
            ? parseInt(`${answer.questionID}`)
            : undefined,
        optionID:
          `${answer.optionID ?? ""}`.length > 0
            ? parseInt(`${answer.optionID}`)
            : undefined,
      };
    }),
  };
  return newItem;
}

// Compare request to response
export function compareQuizRequestToResponse(
  a?: QuizRequest,
  b?: QuizResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatQuizFormToRequest(a);

  return (
    (tempReq?.schoolID === b.school?.id &&
      tempReq?.yearID === b.year?.id &&
      tempReq?.classSubjectID === b.classSubject?.id &&
      tempReq?.unitID === b.unit?.id &&
      tempReq?.title === b.title &&
      tempReq?.description === b.description &&
      tempReq?.status === b.status &&
      tempReq?.questions?.every((aQuestion, i) => {
        const bQuestion = b.questions?.[i];
        return (
          (aQuestion.question?.title === bQuestion?.question?.title &&
            aQuestion.question?.description ===
              bQuestion?.question?.description &&
            aQuestion.options?.every((aOption, j) => {
              const bOption = bQuestion?.options?.[j];
              return (
                aOption.title === bOption &&
                aOption.description === bOption?.description
              );
            })) ||
          (aQuestion?.options?.length ?? 0) < 1
        );
      }))
  );
}
export function compareQuizSolutionRequestToResponse(
  a?: QuizSolutionRequest,
  b?: {
    question?: QuizQuestionResponse | null;
    options?: QuizQuestionOptionResponse[] | null;
  }[],
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatQuizSolutionFormToRequest(a);

  return (
    tempReq?.solutions?.every((aSolution, index) => {
      const bSolution = b[index];
      return (
        aSolution.questionID === bSolution.question?.id &&
        aSolution.optionID === bSolution.question?.solution?.id
      );
    })
  );
}
