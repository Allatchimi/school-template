import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "../../school/common/school/response";

export interface MonitoringResponse extends BaseResponse {
  count?: {
    schools?: number | null;
    directors?: number | null;
    managers?: number | null;
    teachers?: number | null;
    students?: number | null;
    parents?: number | null;
  } | null;

  usersByGender?:
    | {
        gender?: number | null;
        count?: number | null;
      }[]
    | null;

  usersByMonth?:
    | {
        month?: number | null;
        count?: number | null;
      }[]
    | null;

  usersByYear?:
    | {
        year?: number | null;
        count?: number | null;
      }[]
    | null;

  successBySchool?:
    | {
        school?: SchoolResponse | null;
        success?: number | null;
      }[]
    | null;

  successBySchoolGender?:
    | {
        school?: SchoolResponse | null;
        boys?: number | null;
        girls?: number | null;
      }[]
    | null;
}

export interface MonitoringListResponse extends BasePaginatedResponse {
  data?: MonitoringResponse | null;
}
