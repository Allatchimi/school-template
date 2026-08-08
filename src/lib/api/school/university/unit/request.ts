import { IDType } from "@/types/http/base-response";
import { BaseRequest } from "@/types/http/base-request";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { UnitResponse } from "./response";
import { castFileToStringUrl } from "@/helpers/cast/file";
import { UploadFile } from "antd";

export interface UnitRequest extends BaseRequest {
  schoolID?: IDType | null;
  levelDomainID?: IDType | null;
  semesterID?: IDType | null;

  name?: string | null;
  description?: string | null;
  credit?: number | null;
  program?: string | null;
  requirements?: string | null;
  isValid?: boolean | null;
}

export interface UnitListRequest extends FilterRequest, PaginationRequest {
  schoolID?: IDType | null;
  levelDomainID?: IDType | null;
  semesterID?: IDType | null;
}

// Format request
export function formatUnitFormToRequest(item?: UnitRequest) {
  if (!item) {
    return;
  }
  const tempProgram = castFileToStringUrl(
    item.program as UploadFile[] | undefined,
  );
  const tempRequirements = castFileToStringUrl(
    item.requirements as UploadFile[] | undefined,
  );

  const newItem: UnitRequest = {
    ...item,

    schoolID:
      `${item.schoolID ?? ""}`.length > 0
        ? parseInt(`${item.schoolID}`)
        : undefined,
    levelDomainID:
      `${item.levelDomainID ?? ""}`.length > 0
        ? parseInt(`${item.levelDomainID}`)
        : undefined,
    semesterID:
      `${item.semesterID ?? ""}`.length > 0
        ? parseInt(`${item.semesterID}`)
        : undefined,

    program: tempProgram.length > 0 ? tempProgram[0] : undefined,
    requirements: tempRequirements.length > 0 ? tempRequirements[0] : undefined,
  };
  return newItem;
}

// Compare request to response
export function compareUnitRequestToResponse(
  a?: UnitRequest,
  b?: UnitResponse,
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatUnitFormToRequest(a);

  return (
    tempReq?.schoolID === b.school?.id &&
    tempReq?.levelDomainID === b.levelDomain?.id &&
    tempReq?.semesterID === b.semester?.id &&
    tempReq?.name === b.name &&
    tempReq?.description === b.description &&
    tempReq?.credit === b.credit &&
    tempReq?.program === b.program &&
    tempReq?.requirements === b.requirements &&
    tempReq?.isValid === b.isValid
  );
}
