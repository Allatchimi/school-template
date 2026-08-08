import { SchoolResponse } from "../../school/common/school/response";
import { YearResponse } from "../../school/common/year/response";

export interface InitializeResponse {
  school?: SchoolResponse | null;
  years?: YearResponse[] | null;
}
