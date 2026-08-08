import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";

export interface RoleResponse extends BaseResponse {
  name?: string | null;
  feature?: string | null;
  description?: string | null;
}

export interface RoleListResponse extends BasePaginatedResponse {
  data?: RoleResponse[] | null;
}
