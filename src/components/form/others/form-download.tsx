"use client";

import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import FormModalFooter from "@/components/form-item/form-modal-footer";
import { DownloadRequest } from "@/lib/api/others/upload-download/request";
import { Form } from "@/ui/antd";
import { useForm } from "antd/es/form/Form";

export default function FormDownload(props: {
  loading?: boolean;
  formName?: string;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onSubmit?: (value: DownloadRequest) => void;
  onValuesChange?: (value: DownloadRequest) => void;
  onCancel?: () => void;
}) {
  const [form] = useForm<DownloadRequest>();
  return (
    <Form<DownloadRequest>
      form={form}
      name={props.formName ?? "form-download-data"}
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
