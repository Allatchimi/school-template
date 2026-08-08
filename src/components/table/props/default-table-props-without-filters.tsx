import { TableProps } from "antd";
import { ColumnsType } from "../table.type";

export default function DefaultTablePropsWithoutFilters<
  T extends object,
>(props: {
  loading?: boolean;
  data?: T[];
  columns?: ColumnsType<T>;
  bordered?: boolean;
  showHeader?: boolean;
  rowHoverable?: boolean;
}): TableProps<T> {
  return {
    bordered: props.bordered ?? undefined,
    showHeader: props.showHeader ?? undefined,
    rowHoverable: props.rowHoverable ?? undefined,
    columns: props.columns,
    dataSource: props.data ?? undefined,
    loading: props.loading ?? undefined,
    tableLayout: "auto",
    size: "middle",
    showSorterTooltip: false,
    pagination: false,
  };
}
