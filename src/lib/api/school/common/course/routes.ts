import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  CourseRequest,
  CourseListRequest,
  formatCourseFormToRequest,
  CourseCommentListRequest,
  CourseCommentRequest,
  formatCourseCommentFormToRequest,
} from "./request";
import {
  CourseResponse,
  CourseListResponse,
  CourseCommentListResponse,
  CourseCommentResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/courses`;

// Course
export async function getCourse(id: IDType) {
  return GET<CourseResponse, null>(`${PATH_GROUP}/${id}`);
}
export async function getCourseServerSide(
  id: IDType,
  schoolID: IDType,
  schoolApiKey?: string
) {
  const tmpPath = `${process.env.API_BASE_URL}/schools/courses`;
  return GET<CourseResponse, CourseResponse>(`${tmpPath}/${id}`, {
    headers: {
      "X-School-Api-Key": schoolID,
      "X-School-Id": schoolApiKey,
    },
  });
}
export async function getCourseList(
  params: CourseListRequest,
  signal?: GenericAbortSignal
) {
  return GET<CourseListResponse, CourseListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postCourse(item: CourseRequest) {
  return POST<CourseResponse, CourseRequest>(
    `${PATH_GROUP}`,
    formatCourseFormToRequest(item)
  );
}
export async function updateCourse(item: CourseRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<CourseResponse, CourseRequest>(
    `${PATH_GROUP}/${id}`,
    formatCourseFormToRequest(item)
  );
}
export async function deleteCourse(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleCourse(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Course comment
export async function getCourseCommentList(
  params: CourseCommentListRequest,
  signal?: GenericAbortSignal
) {
  const id = params.courseID;
  params.courseID = undefined;
  return GET<CourseCommentListResponse, CourseCommentListRequest>(
    `${PATH_GROUP}/${id}/comments`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
export async function postCourseComment(item: CourseCommentRequest) {
  const courseID = item.courseID;
  item.courseID = undefined;
  return POST<CourseCommentResponse, CourseCommentRequest>(
    `${PATH_GROUP}/${courseID}/comments`,
    formatCourseCommentFormToRequest(item)
  );
}
export async function updateCourseComment(item: CourseCommentRequest) {
  const courseID = item.courseID;
  const id = item.id;
  item.courseID = undefined;
  item.id = undefined;
  return PUT<CourseCommentResponse, CourseCommentRequest>(
    `${PATH_GROUP}/${courseID}/comments/${id}`,
    item
  );
}
export async function deleteCourseComment(id: IDType, commentID: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}/comments/${commentID}`);
}
