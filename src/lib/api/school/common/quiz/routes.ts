import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  QuizRequest,
  QuizListRequest,
  formatQuizFormToRequest,
  QuizSolutionRequest,
  formatQuizSolutionFormToRequest,
  QuizAnswerRequest,
  QuizResultListRequest,
  QuizAnswerListRequest,
} from "./request";
import {
  QuizResponse,
  QuizListResponse,
  QuizResultListResponse,
  QuizAnswerListResponse,
} from "./response";
const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/quizzes`;

// Quiz
export async function getQuiz(id: IDType) {
  return GET<QuizResponse, QuizRequest>(`${PATH_GROUP}/${id}`);
}
export async function getQuizList(
  params: QuizListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<QuizListResponse, QuizListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postQuiz(item: QuizRequest) {
  return POST<QuizResponse, QuizRequest>(
    `${PATH_GROUP}`,
    formatQuizFormToRequest(item),
  );
}
export async function updateQuiz(item: QuizRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<QuizResponse, QuizRequest>(
    `${PATH_GROUP}/${id}`,
    formatQuizFormToRequest(item),
  );
}
export async function deleteQuiz(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleQuiz(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Quiz solution
export async function updateQuizSolution(item: QuizSolutionRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<QuizResponse, QuizSolutionRequest>(
    `${PATH_GROUP}/${id}/solutions`,
    formatQuizSolutionFormToRequest(item),
  );
}

// Quiz answer
export async function postQuizAnswer(item: QuizAnswerRequest) {
  const id = item.id;
  item.id = undefined;
  return POST<null, QuizAnswerRequest>(
    `${PATH_GROUP}/${id}/answers`,
    formatQuizFormToRequest(item),
  );
}
export async function getQuizAnswerList(
  params: QuizAnswerListRequest,
  signal?: GenericAbortSignal,
) {
  const id = params.quizID;
  params.quizID = undefined;
  return GET<QuizAnswerListResponse, QuizAnswerListRequest>(
    `${PATH_GROUP}/${id}/answers`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}

// Quiz result
export async function getQuizResultList(
  params: QuizResultListRequest,
  signal?: GenericAbortSignal,
) {
  const id = params.quizID;
  params.quizID = undefined;
  return GET<QuizResultListResponse, QuizResultListRequest>(
    `${PATH_GROUP}/${id}/results`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
