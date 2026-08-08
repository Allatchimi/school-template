import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { PermissionResponse } from "./response";

export interface PermissionRequest extends BaseRequest {
  roleID?: IDType | null;

  tableName?: string | null;
  create?: boolean | null;
  read?: boolean | null;
  update?: boolean | null;
  delete?: boolean | null;
}

export interface PermissionListRequest
  extends FilterRequest,
    PaginationRequest {}

// Format request
export function formatPermissionFormToRequest(item?: PermissionRequest) {
  if (!item) {
    return;
  }
  const newItem: PermissionRequest = {
    ...item,

    roleID:
      `${item.roleID ?? ""}`.length > 0
        ? parseInt(`${item.roleID}`)
        : undefined,

    create: item.create === true,
    read: item.read === true,
    update: item.update === true,
    delete: item.delete === true,
  };
  return newItem;
}

// Compare request to response
export function comparePermissionRequestToResponse(
  a?: PermissionRequest,
  b?: PermissionResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatPermissionFormToRequest(a);

  return (
    tempReq?.roleID === b.role?.id &&
    tempReq?.tableName === b.tableName &&
    tempReq?.create === b.create &&
    tempReq?.read === b.read &&
    tempReq?.update === b.update &&
    tempReq?.delete === b.delete
  );
}
