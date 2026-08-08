import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  StudentRequest,
  StudentListRequest,
  formatStudentFormToRequest,
  StudentEnrollRequest,
  StudentEnrollListRequest,
  formatStudentEnrollFormToRequest,
  StudentPreEnrollRequest,
  formatStudentPreEnrollFormToRequest,
  StudentPreEnrollListRequest,
  StudentPreEnrollStatusRequest,
} from "./request";
import {
  StudentResponse,
  StudentListResponse,
  StudentEnrollResponse,
  StudentEnrollListResponse,
  StudentPreEnrollListResponse,
  StudentPreEnrollResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/students`;

// Student
export async function getStudent(id: IDType) {
  return GET<StudentResponse, StudentRequest>(`${PATH_GROUP}/${id}`);
}
export async function getStudentList(
  params: StudentListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<StudentListResponse, StudentListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function getStudentListPublic(
  params: StudentListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<StudentListResponse, StudentListRequest>(`${PATH_GROUP}/public`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postStudent(item: StudentRequest) {
  return POST<StudentResponse, StudentRequest>(
    `${PATH_GROUP}`,
    formatStudentFormToRequest(item),
  );
}
export async function updateStudent(item: StudentRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<StudentResponse, StudentRequest>(
    `${PATH_GROUP}/${id}`,
    formatStudentFormToRequest(item),
  );
}
export async function deleteStudent(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleStudent(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Student enroll
export async function getStudentEnroll(id: IDType) {
  return GET<StudentEnrollResponse, StudentEnrollRequest>(
    `${PATH_GROUP}/enrolls/${id}`,
  );
}
export async function getStudentEnrollList(
  params: StudentEnrollListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<StudentEnrollListResponse, StudentEnrollListRequest>(
    `${PATH_GROUP}/enrolls`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function postStudentEnroll(item: StudentEnrollRequest) {
  return POST<StudentEnrollResponse, StudentEnrollRequest>(
    `${PATH_GROUP}/enrolls`,
    formatStudentEnrollFormToRequest(item),
  );
}
export async function updateStudentEnroll(item: StudentEnrollRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<StudentEnrollResponse, StudentEnrollRequest>(
    `${PATH_GROUP}/enrolls/${id}`,
    formatStudentEnrollFormToRequest(item),
  );
}
export async function deleteStudentEnroll(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/enrolls/${id}`);
}
export async function deleteMultipleStudentEnroll(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/enrolls/multiple/delete`,
    {
      data: selection,
    },
  );
}

// Student pre enroll
export async function getStudentPreEnroll(id: IDType) {
  return GET<StudentPreEnrollResponse, StudentPreEnrollRequest>(
    `${PATH_GROUP}/enrolls/${id}`,
  );
}
export async function getStudentPreEnrollList(
  params: StudentPreEnrollListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<StudentPreEnrollListResponse, StudentPreEnrollListRequest>(
    `${PATH_GROUP}/enrolls/pre`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function postStudentPreEnroll(item: StudentPreEnrollRequest) {
  return POST<StudentPreEnrollResponse, StudentPreEnrollRequest>(
    `${PATH_GROUP}/enrolls/pre`,
    formatStudentPreEnrollFormToRequest(item),
  );
}
export async function updateStudentPreEnroll(item: StudentPreEnrollRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<StudentPreEnrollResponse, StudentPreEnrollRequest>(
    `${PATH_GROUP}/enrolls/pre/${id}`,
    formatStudentPreEnrollFormToRequest(item),
  );
}
export async function updateStudentPreEnrollStatus(
  item: StudentPreEnrollStatusRequest,
) {
  const id = item.id;
  item.id = undefined;
  return PUT<StudentPreEnrollResponse, StudentPreEnrollStatusRequest>(
    `${PATH_GROUP}/enrolls/pre/${id}/status`,
    formatStudentPreEnrollFormToRequest(item),
  );
}
export async function deleteStudentPreEnroll(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/enrolls/pre/${id}`);
}
export async function deleteMultipleStudentPreEnroll(
  selection: SelectionRequest,
) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/enrolls/pre/multiple/delete`,
    {
      data: selection,
    },
  );
}
