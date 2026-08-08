import { BaseRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { DirectorResponse } from "./response";
import { UserInfoRequest } from "@/lib/api/user/user/request";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface DirectorRequest extends BaseRequest {
  schoolID?: IDType | null;

  autoGenerateEmail?: boolean | null;
  email?: string | null;
  phoneNumber?: number | null;
  status?: string | null;

  info?: UserInfoRequest | null;
}

export interface DirectorListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

// Format request
export function formatDirectorFormToRequest(item?: DirectorRequest) {
  if (!item) {
    return;
  }
  const tempImage = castFileToStringUrl(
    item.info?.image as UploadFile[] | undefined
  );

  const newItem: DirectorRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    phoneNumber:
      `${item.phoneNumber ?? ""}`.length > 0
        ? parseInt(`${item.phoneNumber}`)
        : undefined,
    info: {
      ...item.info,
      image: tempImage.length > 0 ? tempImage[0] : undefined,
    },
  };
  return newItem;
}

// Compare request to response
export function compareDirectorRequestToResponse(
  a?: DirectorRequest,
  b?: DirectorResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatDirectorFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.email === b.user?.email && 
    tempReq?.phoneNumber === b.user?.phoneNumber &&
    tempReq?.status === b.user?.status &&
    tempReq?.info?.username === b.user?.info?.username &&
    tempReq?.info?.firstName === b.user?.info?.firstName &&
    tempReq?.info?.lastName === b.user?.info?.lastName &&
    tempReq?.info?.birthday === b.user?.info?.birthday &&
    tempReq?.info?.birthLocation === b.user?.info?.birthLocation &&
    tempReq?.info?.address === b.user?.info?.address &&
    tempReq?.info?.language === b.user?.info?.language &&
    tempReq?.info?.image === b.user?.info?.image

  );
}
