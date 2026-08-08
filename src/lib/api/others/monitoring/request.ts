import { IDType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";

export interface MonitoringListRequest
  extends FilterRequest,
    PaginationRequest {
  schoolID?: IDType | null;
}
