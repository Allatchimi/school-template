import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { SectionResponse } from "../section/response";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";

export interface SpecialtyResponse extends BaseResponse {
  school?: SchoolResponse | null;
  section?: SectionResponse | null;
  name?: string | null;
  description?: string | null;
}

export interface SpecialtyListResponse extends BasePaginatedResponse {
  data?: SpecialtyResponse[] | null;
}
