import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { CourseResponse } from "./response";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface CourseRequest extends BaseRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;

  title?: string | null;
  description?: string | null;
  content?: string | null;

  documents?: CourseDocumentRequest[] | null;
  videos?: CourseVideoRequest[] | null;
}

interface CourseDocumentRequest extends BaseRequest {
  title?: string | null;
  description?: string | null;
  url?: string | null;
}

interface CourseVideoRequest extends BaseRequest {
  title?: string | null;
  description?: string | null;
  url?: string | null;
}

export interface CourseCommentRequest extends BaseRequest {
  courseID?: IDType | null;

  message?: string | null;
  rate?: number | null;
}

export interface CourseListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  yearID?: IDType | null;
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
}

export interface CourseCommentListRequest
  extends FilterRequest,
    PaginationRequest {
  courseID?: IDType | null;
  userID?: IDType | null;
}

// Format request
export function formatCourseFormToRequest(item?: CourseRequest) {
  if (!item) {
    return;
  }
  const newItem: CourseRequest = {
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

    documents: item.documents?.map((doc) => {
      const tempUrl = castFileToStringUrl(doc.url as UploadFile[] | undefined);
      return {
        ...doc,
        url: tempUrl.length > 0 ? tempUrl[0] : undefined,
      };
    }),
  };
  return newItem;
}

export function formatCourseCommentFormToRequest(item?: CourseCommentRequest) {
  if (!item) {
    return;
  }
  const newItem: CourseCommentRequest = {
    ...item,

    courseID:
      `${item.courseID ?? ""}`.length > 0
        ? parseInt(`${item.courseID}`)
        : undefined,
    rate:
      `${item.rate ?? ""}`.length > 0 ? parseInt(`${item.rate}`) : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareCourseRequestToResponse(
  a?: CourseRequest,
  b?: CourseResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatCourseFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.yearID === b.year?.id &&
    tempReq?.classSubjectID === b.classSubject?.id &&
    tempReq?.unitID === b.unit?.id &&
    tempReq?.title === b.title &&
    tempReq?.description === b.description &&
    tempReq?.content === b.content &&
    tempReq?.documents?.every((doc, index) => {
      const bDoc = b.documents?.[index];
      return (
        doc.title === bDoc?.title &&
        doc.description === bDoc?.description &&
        doc.url === bDoc?.url
      );
    }) &&
    tempReq?.videos?.every((video, index) => {
      const bVideo = b.videos?.[index];
      return (
        video.title === bVideo?.title &&
        video.description === bVideo?.description &&
        video.url === bVideo?.url
      );
    })
  );
}
