import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "../../school/common/school/response";

export interface ContactResponse extends BaseResponse {
  school?: SchoolResponse | null;

  subject?: string | null;
  email?: string | null;
  message?: string | null;
}

export interface ContactListResponse extends BasePaginatedResponse {
  data?: ContactResponse[] | null;
}
