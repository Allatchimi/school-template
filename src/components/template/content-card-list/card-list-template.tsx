import { ReactNode } from "react";
import { Spin } from "@/ui/antd";
import ResultFailed from "@/components/result/result";

export interface CardListTemplateProps<
  TResp extends object,
  TListResp extends object,
> {
  status?: number;
  loading?: boolean;
  loadingError?: boolean;
  data?: TListResp;
  canUpdate?: boolean;
  canDelete?: boolean;
  onRefresh?: () => void;
  onDescriptionRequested?: (value?: TResp) => void;
  onUpdateRequested?: (value?: TResp) => void;
  onDeleteRequested?: (value?: TResp) => void;
  returnItemListNode?: (props: {
    data?: TListResp;
    canUpdate?: boolean;
    canDelete?: boolean;
    onDescriptionRequested?: (value?: TResp) => void;
    onUpdateRequested?: (value?: TResp) => void;
    onDeleteRequested?: (value?: TResp) => void;
  }) => ReactNode;
}

export default function CardListTemplate<
  TResp extends object,
  TListResp extends object,
>(props: CardListTemplateProps<TResp, TListResp>) {
  const formNode = props.returnItemListNode
    ? props.returnItemListNode({
        data: props.data,
        canUpdate: props.canUpdate,
        canDelete: props.canDelete,
        onDescriptionRequested: props.onDescriptionRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteRequested: props.onDeleteRequested,
      })
    : null;
  return (
    <div className="w-full relative">
      {props.loadingError === true ? (
        <div className="w-full mt-16 flex items-center justify-center">
          <ResultFailed status={props.status} onRefresh={props.onRefresh} />
        </div>
      ) : (
        <Spin spinning={props.loading}>{formNode}</Spin>
      )}
    </div>
  );
}
