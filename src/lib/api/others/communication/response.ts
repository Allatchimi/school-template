import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "../../school/common/school/response";
import { RoleResponse } from "../../user/role/response";

export interface CommunicationResponse extends BaseResponse {
  school?: SchoolResponse | null;
  role?: RoleResponse | null;

  subject?: string | null;
  message?: string | null;
}

export interface CommunicationListResponse extends BasePaginatedResponse {
  data?: CommunicationResponse[] | null;
}
