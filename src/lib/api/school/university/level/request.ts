import { IDType } from "@/types/http/base-response";
import { BaseRequest } from "@/types/http/base-request";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { LevelDomainResponse, LevelResponse } from "./response";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface LevelRequest extends BaseRequest {
  schoolID?: IDType | null;
  name?: string | null;
  description?: string | null;
}

export interface LevelDomainRequest extends BaseRequest {
  schoolID?: IDType | null;
  levelID?: IDType | null;
  domainID?: IDType | null;

  fees?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
}

export interface LevelListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
}

export interface LevelDomainListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
  levelID?: IDType | null;
  domainID?: IDType | null;
}

// Format request
export function formatLevelFormToRequest(item?: LevelRequest) {
  if (!item) {
    return;
  }
  const newItem: LevelRequest = {
    ...item,

    schoolID: parseInt(`${item.schoolID}`),
  };
  return newItem;
}

export function formatLevelDomainFormToRequest(item?: LevelDomainRequest) {
  if (!item) {
    return;
  }
  const tempProgram = castFileToStringUrl(
    item.program as UploadFile[] | undefined,
  );
  const tempRequirements = castFileToStringUrl(
    item.requirements as UploadFile[] | undefined,
  );

  const newItem: LevelDomainRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    levelID:
      `${item.levelID ?? ""}`.length > 0
        ? parseInt(`${item.levelID}`)
        : undefined,
    domainID:
      `${item.domainID ?? ""}`.length > 0
        ? parseInt(`${item.domainID}`)
        : undefined,
    fees:
      `${item.fees ?? ""}`.length > 0 ? parseFloat(`${item.fees}`) : undefined,

    program: tempProgram.length > 0 ? tempProgram[0] : undefined,
    requirements: tempRequirements.length > 0 ? tempRequirements[0] : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareLevelRequestToResponse(
  a?: LevelRequest,
  b?: LevelResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatLevelFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description
  );
}

export function compareLevelDomainRequestToResponse(
  a?: LevelDomainRequest,
  b?: LevelDomainResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatLevelDomainFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.levelID === b.level?.id &&
    tempReq?.domainID === b.domain?.id &&
    tempReq?.fees === b.fees &&
    tempReq?.program === b.program &&
    tempReq?.requirements === b.requirements &&
    tempReq?.isValid === b.isValid
  );
}
