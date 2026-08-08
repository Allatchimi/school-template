import {
  BaseResponse,
  BasePaginatedResponse,
} from "@/types/http/base-response";
import { ClassSubjectResponse } from "../../highschool/class/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";

export interface MeetingResponse extends BaseResponse {
  school?: SchoolResponse | null;
  classSubject?: ClassSubjectResponse | null;
  unit?: UnitResponse | null;

  apiRoomID?: string | null;
  isRunning?: boolean | null;
}

export interface MeetingListResponse extends BasePaginatedResponse {
  data?: MeetingResponse[] | null;
}
