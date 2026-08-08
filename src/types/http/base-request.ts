import { IDType } from "./base-response";

export interface BaseRequest {
  id?: IDType | null;
  schoolType?: string | null;
}

export interface SelectionRequest {
  list?: IDType[] | null;
}
