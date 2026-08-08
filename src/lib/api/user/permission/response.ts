import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { RoleResponse } from "../role/response";

export interface PermissionResponse extends BaseResponse {
  tableName?: string | null;
  create?: boolean | null;
  read?: boolean | null;
  update?: boolean | null;
  delete?: boolean | null;

  role?: RoleResponse | null;
}

export interface PermissionListResponse extends BasePaginatedResponse {
  data?: PermissionResponse[] | null;
}
