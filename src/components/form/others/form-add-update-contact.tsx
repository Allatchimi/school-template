"use client";

import FormItemInputEmail from "@/components/form-item/input/input-email";
import FormItemInputText from "@/components/form-item/input/input-text";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { ContactRequest } from "@/lib/api/others/contact/request";
import { ContactResponse } from "@/lib/api/others/contact/response";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../form";
import { SchoolConfig } from "@/config/school";
import { useDefaultFormRule } from "@/hooks/use-form-rule";
import { useTranslations } from "next-intl";

export default function FormAddUpdateContact(
  props: CustomFormProps<ContactRequest, ContactResponse>
) {
  // React hooks
  const [form] = useForm<ContactRequest>();
  const initialRequest: ContactRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [, setRequest] = useState<ContactRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ContactRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ContactRequest) => {
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
      name={props.formName ?? "form-add-update-contact"}
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
          required={true}
          width={"100%"}
        />
      ) : undefined}
      <FormItemInputEmail
        disabled={props.disabled}
        defaultValue={props.item?.email ?? undefined}
        label={tWords("email")}
        name="email"
        required={true}
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
      <FormItemInputText
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
