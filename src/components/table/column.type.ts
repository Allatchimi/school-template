import { IDType } from "@/types/http/base-response";
import { SortOrder } from "antd/es/table/interface";

export interface TableColumnsProps {
  schoolType?: string;
  yearID?: IDType;
  orderBy?: string;
  sort?: SortOrder;
}

export interface TableColumnDataProps {
  title?: string;
  dataIndex?: string | string[];
  key?: string;
  fixed?: "left" | "right" | boolean;
  sorter?: boolean;
}
