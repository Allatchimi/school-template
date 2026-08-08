"use client";

import { useState } from "react";
import CustomForm, { CustomFormProps } from "@/components/form/form";
import { ProfilePasswordNewPasswordRequest } from "@/lib/api/user/profile/request";
import { useForm } from "antd/es/form/Form";
import FormItemInputPassword from "@/components/form-item/input/input-password";
import FormItemInputConfirmPassword from "@/components/form-item/input/input-confirm-password";
import { useTranslations } from "next-intl";

export function FormUpdateProfileNewPassword(
  props: CustomFormProps<
    ProfilePasswordNewPasswordRequest,
    ProfilePasswordNewPasswordRequest
  >
) {
  // React hooks
  const [form] = useForm<ProfilePasswordNewPasswordRequest>();
  const initialRequest: ProfilePasswordNewPasswordRequest = {};
  const [, setRequest] = useState<
    ProfilePasswordNewPasswordRequest | undefined
  >(initialRequest);

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ProfilePasswordNewPasswordRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ProfilePasswordNewPasswordRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      newValues.token = props.item?.token;
      newValues.confirmPassword = undefined;
      props.onSubmit(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-update-profile-new-password"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemInputPassword
        disabled={props.loading}
        name="currentPassword"
        label={tWords("currentPassword")}
        placeholder={tWords("currentPassword")}
        required={true}
        size="large"
      />
      <FormItemInputPassword
        disabled={props.loading}
        name="password"
        label={tWords("password")}
        placeholder={tWords("password")}
        required={true}
        size="large"
      />
      <FormItemInputConfirmPassword
        disabled={props.loading}
        name="confirmPassword"
        label={tWords("confirmPassword")}
        placeholder={tWords("confirmPassword")}
        required={true}
        size="large"
      />
    </CustomForm>
  );
}
