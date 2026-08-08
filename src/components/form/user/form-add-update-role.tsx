"use client";

import FormItemSelectFeature from "@/components/form-item/select/user/select-feature";
import { RoleRequest } from "@/lib/api/user/role/request";
import CustomForm, { CustomFormProps } from "../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { RoleResponse } from "@/lib/api/user/role/response";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateRole(
  props: CustomFormProps<RoleRequest, RoleResponse>
) {
  // React hooks
  const [form] = useForm<RoleRequest>();
  const initialRequest: RoleRequest = {};
  const [, setRequest] = useState<RoleRequest | undefined>(initialRequest);

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: RoleRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: RoleRequest) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-role"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.name ?? undefined}
        label={tWords("name")}
        name="name"
        placeholder={tWords("name")}
        rules={useDefaultFormRule({
          fielLabel: tWords("name"),
          options: {
            required: true,
            max: 150,
          },
        })}
      />

      <FormItemSelectFeature
        disabled={props.disabled}
        defaultValue={props.item?.feature ?? undefined}
        required={true}
        width={"100%"}
      />
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.description ?? undefined}
        label={tWords("description")}
        name="description"
        placeholder={tWords("description")}
        rules={useDefaultFormRule({
          fielLabel: tWords("description"),
          options: {
            required: true,
            max: 500,
          },
        })}
      />
    </CustomForm>
  );
}
