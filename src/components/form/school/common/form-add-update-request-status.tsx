"use client";

import FormItemInputTextArea from "@/components/form-item/input/input-text-area";
import FormItemSelectRequestStatus from "@/components/form-item/select/school/common/select-request-status";
import { RequestStatusRequest } from "@/lib/api/school/common/request/request";
import { RequestResponse } from "@/lib/api/school/common/request/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateRequestStatus(
  props: CustomFormProps<RequestStatusRequest, RequestResponse>
) {
  // React hooks
  const [form] = useForm<RequestStatusRequest>();
  const initialRequest: RequestStatusRequest = {};
  const [, setRequest] = useState<RequestStatusRequest | undefined>(
    initialRequest
  );

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: RequestStatusRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: RequestStatusRequest) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-request-status"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemSelectRequestStatus
        disabled={props.disabled}
        defaultValue={props.item?.status ?? undefined}
        required={true}
        width={"100%"}
      />

      <FormItemInputTextArea
        disabled={props.disabled}
        defaultValue={props.item?.statusFeedback ?? undefined}
        label={tWords("statusFeedback")}
        name={"statusFeedback"}
        rules={useDefaultFormRule({
          fielLabel: tWords("statusFeedback"),
          options: {
            required: false,
          },
        })}
      />
    </CustomForm>
  );
}
