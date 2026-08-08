import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import {
  ClassListResponse,
  ClassResponse,
  ClassSubjectListResponse,
  ClassSubjectResponse,
} from "./response";
import {
  ClassListRequest,
  ClassRequest,
  ClassSubjectListRequest,
  ClassSubjectRequest,
  formatClassFormToRequest,
  formatClassSubjectFormToRequest,
} from "./request";
import { SelectionRequest } from "@/types/http/base-request";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { IDType } from "@/types/http/base-response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/highschool/classes`;

// Class
export async function getClass(id: IDType) {
  return GET<ClassResponse, ClassRequest>(`${PATH_GROUP}/${id}`);
}
export async function getClassList(
  params: ClassListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ClassListResponse, ClassListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function getClassListPublic(
  params: ClassListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ClassListResponse, ClassListRequest>(`${PATH_GROUP}/public`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postClass(item: ClassRequest) {
  return POST<ClassResponse, ClassRequest>(
    `${PATH_GROUP}`,
    formatClassFormToRequest(item),
  );
}
export async function updateClass(item: ClassRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ClassResponse, ClassRequest>(
    `${PATH_GROUP}/${id}`,
    formatClassFormToRequest(item),
  );
}
export async function deleteClass(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleClass(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Class subject
export async function getClassSubject(id: IDType) {
  return GET<ClassSubjectResponse, ClassSubjectRequest>(
    `${PATH_GROUP}/subjects/${id}`,
  );
}
export async function getClassSubjectList(
  params: ClassSubjectListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<ClassSubjectListResponse, ClassSubjectListRequest>(
    `${PATH_GROUP}/subjects`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function postClassSubject(item: ClassSubjectRequest) {
  return POST<ClassSubjectResponse, ClassSubjectRequest>(
    `${PATH_GROUP}/subjects`,
    formatClassSubjectFormToRequest(item),
  );
}
export async function updateClassSubject(item: ClassSubjectRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ClassSubjectResponse, ClassSubjectRequest>(
    `${PATH_GROUP}/subjects/${id}`,
    formatClassSubjectFormToRequest(item),
  );
}
export async function deleteClassSubject(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/subjects/${id}`);
}
export async function deleteMultipleClassSubject(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/subjects/multiple/delete`,
    {
      data: selection,
    },
  );
}
