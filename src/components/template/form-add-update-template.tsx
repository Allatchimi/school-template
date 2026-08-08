import { ReactNode } from "react";

export interface FormAddUpdateTemplateProps<
  TReq extends object,
  TResp extends object,
> {
  loading?: boolean;
  disabled?: boolean;
  mounted?: boolean;
  formName?: string;
  item?: TResp;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (value?: TReq) => void;
  onSubmit: (value?: TReq) => void;
  onCancel: () => void;
  returnFormAddUpdateNode?: (props: {
    loading?: boolean;
    disabled?: boolean;
    mounted?: boolean;
    formName?: string;
    item?: TResp;
    canSubmit?: boolean;
    canSubmitMessage?: string;
    errorMessage?: string;
    onValuesChange?: (value?: TReq) => void;
    onSubmit: (value?: TReq) => void;
    onCancel: () => void;
  }) => ReactNode;
}

export default function FormAddUpdateTemplate<
  TReq extends object,
  TResp extends object,
>(props: FormAddUpdateTemplateProps<TReq, TResp>) {
  const formNode = props.returnFormAddUpdateNode
    ? props.returnFormAddUpdateNode({
        loading: props.loading,
        disabled: props.disabled,
        mounted: props.mounted,
        formName: props.formName,
        item: props.item,
        canSubmit: props.canSubmit,
        canSubmitMessage: props.canSubmitMessage,
        errorMessage: props.errorMessage,
        onValuesChange: props.onValuesChange,
        onSubmit: props.onSubmit,
        onCancel: props.onCancel,
      })
    : null;
  return <>{formNode}</>;
}
