import type { GetProp, TableProps } from "antd";

type SizeType = TableProps["size"];
type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;
type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition = NonNullable<
  TablePagination<object>["position"]
>[number];
type ExpandableConfig<T extends object> = TableProps<T>["expandable"];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

export type { SizeType };
export type { ColumnsType };
export type { TablePagination };
export type { TablePaginationPosition };
export type { ExpandableConfig };
export type { TableRowSelection };
