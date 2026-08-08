"use client";

import FormItemInputText from "@/components/form-item/input/input-text";
import FormItemInputTextArea from "@/components/form-item/input/input-text-area";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { CommunicationRequest } from "@/lib/api/others/communication/request";
import { CommunicationResponse } from "@/lib/api/others/communication/response";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../form";
import { SchoolConfig } from "@/config/school";
import FormItemSelectRole from "@/components/form-item/select/user/select-role";
import { useDefaultFormRule } from "@/hooks/use-form-rule";
import { useTranslations } from "next-intl";

export default function FormAddUpdateCommunication(
  props: CustomFormProps<CommunicationRequest, CommunicationResponse>
) {
  // React hooks
  const [form] = useForm<CommunicationRequest>();
  const initialRequest: CommunicationRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [, setRequest] = useState<CommunicationRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: CommunicationRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: CommunicationRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      if (initialRequest?.schoolID) {
        newValues.schoolID = initialRequest.schoolID;
      }
      props.onSubmit(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name="form-add-update-communication"
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      {!initialRequest.schoolID ? (
        <FormItemSelectSchool
          disabled={props.disabled || (props.item?.school?.id ?? 0) > 0}
          defaultValue={props.item?.school?.id?.toString()}
          defaultOptions={props?.item?.school ? [props?.item?.school] : []}
          allowEmptySelection={true}
          allowEmptySelectionLabel="*"
          required={false}
          width={"100%"}
        />
      ) : undefined}

      <FormItemSelectRole
        disabled={props.disabled}
        defaultValue={props.item?.role?.id?.toString() ?? undefined}
        defaultOptions={props?.item?.role ? [props?.item?.role] : []}
        label={tWords("audience")}
        name="roleIDs"
        mode="multiple"
        required={true}
        width={"100%"}
      />

      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.subject ?? undefined}
        label={tWords("topic")}
        name="subject"
        placeholder={tWords("topic")}
        rules={useDefaultFormRule({
          fielLabel: tWords("topic"),
          options: {
            required: true,
            max: 150,
          },
        })}
      />
      <FormItemInputTextArea
        disabled={props.disabled}
        defaultValue={props.item?.message ?? undefined}
        label={tWords("message")}
        name="message"
        placeholder={tWords("message")}
        rules={useDefaultFormRule({
          fielLabel: tWords("message"),
          options: {
            required: true,
            max: 500,
          },
        })}
      />
    </CustomForm>
  );
}
