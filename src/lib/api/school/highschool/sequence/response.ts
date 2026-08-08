import {
  BasePaginatedResponse,
  BaseResponse,
} from "@/types/http/base-response";
import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { QuarterResponse } from "../quarter/response";

export interface SequenceResponse extends BaseResponse {
  school?: SchoolResponse | null;
  quarter?: QuarterResponse | null;

  name?: string | null;
  description?: string | null;
}

export interface SequenceListResponse extends BasePaginatedResponse {
  data?: SequenceResponse[] | null;
}
