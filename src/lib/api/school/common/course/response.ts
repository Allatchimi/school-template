import { UserResponse } from "@/lib/api/user/user/response";
import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { ClassSubjectResponse } from "../../highschool/class/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";
import { YearResponse } from "../year/response";
import { UploadFile } from "antd";
import { castStringUrlToFile } from "@/helpers/cast/file";

export interface CourseResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  classSubject?: ClassSubjectResponse | null;
  unit?: UnitResponse | null;

  title?: string | null;
  description?: string | null;
  content?: string | null;

  videos?: CourseVideoResponse[] | null;
  documents?: CourseDocumentResponse[] | null;
}

export interface CourseDocumentResponse extends BaseResponse {
  course?: CourseResponse | null;

  title?: string | null;
  description?: string | null;
  url?: string | UploadFile[] | null;
}

export interface CourseVideoResponse extends BaseResponse {
  course?: CourseResponse | null;

  title?: string | null;
  description?: string | null;
  url?: string | null;
}

export interface CourseCommentResponse extends BaseResponse {
  course?: CourseResponse | null;
  user?: UserResponse | null;

  message?: string | null;
  rate?: number | null;
  isDeleted?: boolean | null;
}

export interface CourseListResponse extends BasePaginatedResponse {
  data?: CourseResponse[] | null;
}

export interface CourseDocumentListResponse extends BasePaginatedResponse {
  data?: CourseDocumentResponse[] | null;
}

export interface CourseVideoListResponse extends BasePaginatedResponse {
  data?: CourseVideoResponse[] | null;
}

export interface CourseCommentListResponse extends BasePaginatedResponse {
  data?: CourseCommentResponse[] | null;
}

// Format response list to form
export const formatCourseDocumentListResponseToForm = (
  items: CourseDocumentResponse[],
) => {
  if (items.length < 1) {
    return undefined;
  }
  const newDocuments: CourseDocumentResponse[] = [];
  for (let i = 0; i < items.length; i++) {
    newDocuments.push({
      ...items[i],
      url: items[i].url
        ? [
            castStringUrlToFile(
              items[i].url?.toString() ?? "",
              items[i].id ?? undefined,
            ),
          ]
        : undefined,
    });
  }
  return newDocuments;
};
