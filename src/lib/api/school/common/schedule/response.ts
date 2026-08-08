import {
  BaseResponse,
  TimeType,
  BasePaginatedResponse,
  DateType,
} from "@/types/http/base-response";
import { ClassSubjectResponse } from "../../highschool/class/response";
import { UnitResponse } from "../../university/unit/response";
import { SchoolResponse } from "../school/response";
import { YearResponse } from "../year/response";

export interface ScheduleResponse extends BaseResponse {
  school?: SchoolResponse | null;
  year?: YearResponse | null;
  classSubject?: ClassSubjectResponse | null;
  unit?: UnitResponse | null;

  isCommon?: boolean | null;
  type?: string | null;
  description?: string | null;
  dayOfTheWeek?: string | null;
  repeatCount?: number | null;
  repeatType?: string | null;
  startTime?: TimeType | null;
  endTime?: TimeType | null;
  startCountDate?: DateType | null;
  isValid?: boolean | null;
  invalidDate?: DateType | null;
}

export interface ScheduleWeeklyViewResponse extends BaseResponse {
  startTime?: TimeType | null;
  endTime?: TimeType | null;

  monday?: ScheduleResponse[] | null;
  tuesday?: ScheduleResponse[] | null;
  wednesday?: ScheduleResponse[] | null;
  thursday?: ScheduleResponse[] | null;
  friday?: ScheduleResponse[] | null;
  saturday?: ScheduleResponse[] | null;
  sunday?: ScheduleResponse[] | null;
}

export interface ScheduleListResponse extends BasePaginatedResponse {
  data?: ScheduleResponse[] | null;
}

export interface ScheduleWeeklyViewListResponse extends BasePaginatedResponse {
  data?: ScheduleWeeklyViewResponse[] | null;
}
