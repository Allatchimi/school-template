import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { SelectionRequest } from "@/types/http/base-request";
import {
  SubjectRequest,
  SubjectListRequest,
  formatSubjectFormToRequest,
} from "./request";
import { SubjectResponse, SubjectListResponse } from "./response";
import { IDType } from "@/types/http/base-response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/highschool/subjects`;

// Subject
export async function getSubject(id: IDType) {
  return GET<SubjectResponse, SubjectRequest>(`${PATH_GROUP}/${id}`);
}
export async function getSubjectList(
  params: SubjectListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<SubjectListResponse, SubjectListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postSubject(item: SubjectRequest) {
  return POST<SubjectResponse, SubjectRequest>(
    `${PATH_GROUP}`,
    formatSubjectFormToRequest(item),
  );
}
export async function updateSubject(item: SubjectRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<SubjectResponse, SubjectRequest>(
    `${PATH_GROUP}/${id}`,
    formatSubjectFormToRequest(item),
  );
}
export async function deleteSubject(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleSubject(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
