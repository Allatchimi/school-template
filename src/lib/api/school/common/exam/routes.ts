import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  ExamRequest,
  ExamListRequest,
  formatExamFormToRequest,
  ExamTypeRequest,
  ExamTypeListRequest,
  formatExamTypeFormToRequest,
} from "./request";
import {
  ExamResponse,
  ExamListResponse,
  ExamTypeResponse,
  ExamTypeListResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/exams`;

// Exam
export async function getExam(id: IDType) {
  return GET<ExamResponse, ExamRequest>(`${PATH_GROUP}/${id}`);
}
export async function getExamList(
  params: ExamListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ExamListResponse, ExamListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postExam(item: ExamRequest) {
  return POST<ExamResponse, ExamRequest>(
    `${PATH_GROUP}`,
    formatExamFormToRequest(item),
  );
}
export async function updateExam(item: ExamRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ExamResponse, ExamRequest>(
    `${PATH_GROUP}/${id}`,
    formatExamFormToRequest(item),
  );
}
export async function deleteExam(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleExam(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Exam type
export async function getExamType(id: IDType) {
  return GET<ExamTypeResponse, ExamTypeRequest>(`${PATH_GROUP}/types/${id}`);
}
export async function getExamTypeList(
  params: ExamTypeListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ExamTypeListResponse, ExamTypeListRequest>(`${PATH_GROUP}/types`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postExamType(item: ExamTypeRequest) {
  return POST<ExamTypeResponse, ExamTypeRequest>(
    `${PATH_GROUP}/types`,
    formatExamTypeFormToRequest(item),
  );
}
export async function updateExamType(item: ExamTypeRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ExamTypeResponse, ExamTypeRequest>(
    `${PATH_GROUP}/types/${id}`,
    formatExamTypeFormToRequest(item),
  );
}
export async function deleteExamType(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/types/${id}`);
}
export async function deleteMultipleExamType(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/types/multiple/delete`,
    {
      data: selection,
    },
  );
}
