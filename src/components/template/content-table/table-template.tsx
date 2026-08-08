"use client";

import DefaultTableProps from "@/components/table/props/default-table-props";
import { defaultColumnActionProps } from "@/components/table/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { TableColumnsType } from "antd";
import { Table } from "@/ui/antd";
import ResultFailed from "@/components/result/result";
import { useTranslations } from "next-intl";

export interface TableTemplateProps<TResp extends object> {
  status?: number;
  loading?: boolean;
  loadingError?: boolean;
  itemLabel?: string;
  items?: TResp[];
  orderBy?: string;
  sort?: SortOrder;
  columns?: TableColumnsType<TResp>;
  addDefaultActions?: boolean;
  selectedRowKeys?: React.Key[];
  canUpdate?: boolean;
  canDelete?: boolean;
  canSelectMultiple?: boolean;
  onRefresh?: () => void;
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TResp> | SorterResult<TResp>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: TResp[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: TResp,
    selected: boolean,
    selectedRows: TResp[],
    nativeEvent: Event
  ) => void;
  onDescriptionRequested?: (value?: TResp, index?: number) => void;
  onUpdateRequested?: (value?: TResp, index?: number) => void;
  onDeleteConfirmed?: (value?: TResp, index?: number) => void;
}

export default function TableTemplate<TResp extends object>(
  props: TableTemplateProps<TResp>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.modal.confirm");
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<TResp> = [
    ...(props.columns ?? []),
    ...(props.addDefaultActions === true
      ? [
          defaultColumnActionProps({
            canUpdate: props.canUpdate,
            canDelete: props.canDelete,
            deleteDescription: props.itemLabel,
            onDescriptionRequested: props.onDescriptionRequested,
            onUpdateRequested: props.onUpdateRequested,
            onDeleteConfirmed: props.onDeleteConfirmed,
            tSentences: tSentences,
            tWords: tWords,
          }),
        ]
      : []),
  ];

  return (
    <div className="w-full mt-2 scrollbar">
      {props.loadingError === true ? (
        <div className="w-full mt-16 flex items-center justify-center">
          <ResultFailed status={props.status} onRefresh={props.onRefresh} />
        </div>
      ) : (
        <Table<TResp>
          {...DefaultTableProps({
            loading: props.loading,
            items: props.items,
            columns: columns,
            selectedRowKeys: props.selectedRowKeys,
            canSelectMultiple: props.canSelectMultiple,
            onFilterSortChanged: props.onFilterSortChanged,
            onRowSelectionChanged: props.onRowSelectionChanged,
            onRowSelectionSelected: props.onRowSelectionSelected,
          })}
        />
      )}
    </div>
  );
}
