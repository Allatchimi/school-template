"use client";

import FormModalFooter from "@/components/form-item/form-modal-footer";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { UploadRequest } from "@/lib/api/others/upload-download/request";
import { useForm } from "antd/es/form/Form";
import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import { Form } from "@/ui/antd";

export default function FormUpload(props: {
  loading?: boolean;
  formName?: string;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onFileChange?: (info: UploadChangeParam<UploadFile<any>>) => void;
  onFileDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onSubmit?: (value: UploadRequest) => void;
  onValuesChange?: (value: UploadRequest) => void;
  onCancel?: () => void;
}) {
  const [form] = useForm<UploadRequest>();
  return (
    <Form<UploadRequest>
      form={form}
      name={props.formName ?? "form-upload-data"}
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />

      <FormAlertDefaultError errorMessage={props.errorMessage} />
      {props.canSubmitMessage && props.canSubmitMessage.length > 0 ? (
        <div className="w-full flex items-center justify-end">
          <p className="w-auto text-end opacity-75">{props.canSubmitMessage}</p>
        </div>
      ) : undefined}

      <FormModalFooter
        loading={props.loading}
        canSubmit={props.canSubmit}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
