import { TableProps } from "antd";
import { ColumnsType } from "../table.type";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
} from "antd/es/table/interface";

export default function DefaultTableProps<T extends object>(props: {
  loading?: boolean;
  items?: T[];
  columns?: ColumnsType<T>;
  selectedRowKeys?: React.Key[];
  canSelectMultiple?: boolean;
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: T[],
    info: {
      type: RowSelectMethod;
    },
  ) => void;
  onRowSelectionSelected?: (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event,
  ) => void;
}): TableProps<T> {
  return {
    columns: props.columns ?? undefined,
    dataSource: props.items ?? undefined,
    onChange: (_pagination, filters, sorter) => {
      if (props.onFilterSortChanged) {
        props.onFilterSortChanged(filters, sorter);
      }
    },
    rowSelection:
      props.canSelectMultiple === true
        ? {
            selectedRowKeys: props.selectedRowKeys ?? undefined,
            onChange: props.onRowSelectionChanged,
            onSelect: props.onRowSelectionSelected,
            type: "checkbox",
            preserveSelectedRowKeys: false,
          }
        : undefined,
    size: "middle",
    rowKey: "id",
    tableLayout: "auto",
    pagination: false,
    bordered: true,
    showHeader: true,
    showSorterTooltip: true,
    loading: props.loading ?? undefined,
    scroll: { x: "max-content" },
  };
}
