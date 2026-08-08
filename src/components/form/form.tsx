import FormAlertDefaultDescription from "../form-item/alert/default-description";
import FormAlertDefaultError from "../form-item/alert/default-error";
import FormModalFooter from "../form-item/form-modal-footer";
import { IDType } from "@/types/http/base-response";
import { FormInstance, FormProps } from "antd";
import { Form } from "@/ui/antd";

type FormOmitProps<T extends object> = Omit<
  FormProps<T>,
  "onFinish" | "onValuesChange"
>;

type CustomFormInternalOmitProps<
  TReq extends object,
  TResp extends object,
> = Omit<CustomFormInternalProps<TReq, TResp>, "onFinish">;

export type CustomFormProps<TReq extends object, TResp extends object> = {
  onSubmit?: (value: TReq) => void;
} & CustomFormInternalOmitProps<TReq, TResp>;

type CustomFormInternalProps<TReq extends object, TResp extends object> = {
  loading?: boolean;
  disabled?: boolean;
  mounted?: boolean;
  schoolID?: IDType;
  item?: TResp;
  formName?: string;
  form?: FormInstance<TReq>;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  onValuesChange?: (value: TReq) => void;
  onFinish?: (value: TReq) => void;
  onCancel?: () => void;
} & FormOmitProps<TReq>;

export default function CustomForm<TReq extends object, TResp extends object>(
  props: CustomFormInternalProps<TReq, TResp>
) {
  const handleValuesChange = (_changed: any, values: TReq) => {
    if (props.onValuesChange) {
      props.onValuesChange(values);
    }
  };

  const handleFinish = (values: TReq) => {
    if (props.onFinish) {
      props.onFinish(values);
    }
  };
  return (
    <Form<TReq>
      form={props.form}
      name={props.formName}
      layout={props.layout ?? "vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete={props.autoComplete ?? "on"}
      className="w-full"
    >
      <div className="w-full h-full flex flex-col justify-between pt-6">
        {props.children}
        <div className="w-full mt-2">
          <FormAlertDefaultError errorMessage={props.errorMessage} />
          <FormAlertDefaultDescription
            canSubmitMessage={props.canSubmitMessage}
          />
          <FormModalFooter
            loading={props.loading}
            canSubmit={props.canSubmit}
            onCancel={props.onCancel}
          />
        </div>
      </div>
    </Form>
  );
}
