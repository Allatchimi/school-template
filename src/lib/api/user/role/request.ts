import { BaseRequest } from "@/types/http/base-request";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { RoleResponse } from "./response";

export interface RoleRequest extends BaseRequest {
  name?: string | null;
  feature?: string | null;
  description?: string | null;
}

export interface RoleListRequest extends FilterRequest, PaginationRequest {
  feature?: string | null;
}

// Format request
export function formatRoleFormToRequest(item?: RoleRequest) {
  if (!item) {
    return;
  }
  const newItem: RoleRequest = {
    ...item,
  };
  return newItem;
}

// Compare request to response
export function compareRoleRequestToResponse(
  a?: RoleRequest,
  b?: RoleResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatRoleFormToRequest(a);

  return (
    tempReq?.name === b.name &&
    tempReq?.feature === b.feature &&
    tempReq?.description === b.description
  );
}
