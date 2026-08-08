import { BaseRequest } from "@/types/http/base-request";
import { IDType, DateType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { UserResponse } from "./response";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface UserRequest extends BaseRequest {
  schoolID?: IDType | null;
  roleID?: IDType | null;

  email?: string | null;
  phoneNumber?: number | null;
  isActivated?: boolean | null;
  status?: string | null;

  info?: UserInfoRequest | null;
}

export interface UserInfoRequest {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthday?: DateType | null;
  birthLocation?: string | null;
  address?: string | null;
  language?: string | null;
  image?: string | null;
}

export interface UserListRequest extends FilterRequest, PaginationRequest {
  roleName?: string | null;
}

// Format request
export function formatUserFormToRequest(item?: UserRequest) {
  if (!item) {
    return;
  }
  const tempImage = castFileToStringUrl(
    item.info?.image as UploadFile[] | undefined,
  );

  const newItem: UserRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    roleID:
      `${item.roleID ?? ""}`.length > 0
        ? parseInt(`${item.roleID}`)
        : undefined,
    phoneNumber: `${item.phoneNumber ?? ""}`.length
      ? parseInt(`${item.phoneNumber}`)
      : undefined,
    info: {
      ...item.info,
      image: tempImage.length > 0 ? tempImage[0] : undefined,
    },
  };
  return newItem;
}
export function formatUserInfoFormToRequest(item?: UserInfoRequest) {
  if (!item) {
    return;
  }
  const tempImage = castFileToStringUrl(item.image as UploadFile[] | undefined);

  const newItem: UserInfoRequest = {
    ...item,

    image: tempImage.length > 0 ? tempImage[0] : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareUserRequestToResponse(
  a?: UserRequest,
  b?: UserResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatUserFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.roleID === b.role?.id &&
    tempReq?.email === b.email &&
    tempReq?.phoneNumber === b.phoneNumber &&
    tempReq?.isActivated === b.isActivated &&
    tempReq?.status === b.status &&
    tempReq?.info?.username === b.info?.username &&
    tempReq?.info?.firstName === b.info?.firstName &&
    tempReq?.info?.lastName === b.info?.lastName &&
    tempReq?.info?.birthday === b.info?.birthday &&
    tempReq?.info?.birthLocation === b.info?.birthLocation &&
    tempReq?.info?.address === b.info?.address &&
    tempReq?.info?.language === b.info?.language &&
    tempReq?.info?.image === b.info?.image
  );
}
export function compareUserInfoRequestToResponse(
  a?: UserInfoRequest,
  b?: UserResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatUserInfoFormToRequest(a);

  return (
    tempReq?.username === b.info?.username &&
    tempReq?.firstName === b.info?.firstName &&
    tempReq?.lastName === b.info?.lastName &&
    tempReq?.birthday === b.info?.birthday &&
    tempReq?.birthLocation === b.info?.birthLocation &&
    tempReq?.address === b.info?.address &&
    tempReq?.language === b.info?.language &&
    tempReq?.image === b.info?.image
  );
}
