"use client";

import { useState } from "react";
import CustomForm, { CustomFormProps } from "@/components/form/form";
import { ProfilePhoneNumberNewPhoneNumberRequest } from "@/lib/api/user/profile/request";
import { useForm } from "antd/es/form/Form";
import FormItemInputPhone from "@/components/form-item/input/input-phone";
import { useTranslations } from "next-intl";

export function FormUpdateProfileNewPhoneNumber(
  props: CustomFormProps<
    ProfilePhoneNumberNewPhoneNumberRequest,
    ProfilePhoneNumberNewPhoneNumberRequest
  >
) {
  // React hooks
  const [form] = useForm<ProfilePhoneNumberNewPhoneNumberRequest>();
  const initialRequest: ProfilePhoneNumberNewPhoneNumberRequest = {};
  const [, setRequest] = useState<
    ProfilePhoneNumberNewPhoneNumberRequest | undefined
  >(initialRequest);

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (
    values: ProfilePhoneNumberNewPhoneNumberRequest
  ) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ProfilePhoneNumberNewPhoneNumberRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      newValues.token = props.item?.token;
      props.onSubmit(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-update-profile-new-phone-number"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemInputPhone
        disabled={props.disabled}
        defaultValue={props.item?.phoneNumber?.toString() ?? undefined}
        label={tWords("phoneNumber")}
        name={"phoneNumber"}
        required={true}
      />
    </CustomForm>
  );
}
