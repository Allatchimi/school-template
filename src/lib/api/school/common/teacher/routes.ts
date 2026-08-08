import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { IDType } from "../../../../../types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  TeacherClassSubjectUnitListResponse,
  TeacherClassSubjectUnitResponse,
  TeacherListResponse,
  TeacherResponse,
} from "./response";
import {
  TeacherClassSubjectUnitListRequest,
  TeacherClassSubjectUnitRequest,
  TeacherListRequest,
  TeacherRequest,
} from "./request";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { SelectionRequest } from "../../../../../types/http/base-request";
import { formatTeacherFormToRequest } from "./request";
import { formatTeacherClassSubjectUnitFormToRequest } from "./request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/teachers`;

// Teacher
export async function getTeacher(id: IDType) {
  return GET<TeacherResponse, TeacherRequest>(`${PATH_GROUP}/${id}`);
}
export async function getTeacherList(
  params: TeacherListRequest,
  signal?: GenericAbortSignal
) {
  return GET<TeacherListResponse, TeacherListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postTeacher(item: TeacherRequest) {
  return POST<TeacherResponse, TeacherRequest>(
    `${PATH_GROUP}`,
    formatTeacherFormToRequest(item)
  );
}
export async function updateTeacher(item: TeacherRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<TeacherResponse, TeacherRequest>(
    `${PATH_GROUP}/${id}`,
    formatTeacherFormToRequest(item)
  );
}
export async function deleteTeacher(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleTeacher(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Teacher class subject unit
export async function getTeacherClassSubjectUnit(id: IDType) {
  return GET<TeacherClassSubjectUnitResponse, TeacherClassSubjectUnitRequest>(
    `${PATH_GROUP}/classsubjectunits/${id}`
  );
}
export async function getTeacherClassSubjectUnitList(
  params: TeacherClassSubjectUnitListRequest,
  signal?: GenericAbortSignal
) {
  return GET<
    TeacherClassSubjectUnitListResponse,
    TeacherClassSubjectUnitListRequest
  >(`${PATH_GROUP}/classsubjectunits`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postTeacherClassSubjectUnit(
  item: TeacherClassSubjectUnitRequest
) {
  return POST<TeacherClassSubjectUnitResponse, TeacherClassSubjectUnitRequest>(
    `${PATH_GROUP}/classsubjectunits`,
    formatTeacherClassSubjectUnitFormToRequest(item)
  );
}
export async function updateTeacherClassSubjectUnit(
  item: TeacherClassSubjectUnitRequest
) {
  const id = item.id;
  item.id = undefined;
  return PUT<TeacherClassSubjectUnitResponse, TeacherClassSubjectUnitRequest>(
    `${PATH_GROUP}/classsubjectunits/${id}`,
    formatTeacherClassSubjectUnitFormToRequest(item)
  );
}
export async function deleteTeacherClassSubjectUnit(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/classsubjectunits/${id}`);
}
export async function deleteMultipleTeacherClassSubjectUnit(
  selection: SelectionRequest
) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/classsubjectunits/multiple/delete`,
    {
      data: selection,
    }
  );
}
