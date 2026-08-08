"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemSelectPermissionTable from "@/components/form-item/select/user/select-permission-table";
import FormItemSelectRole from "@/components/form-item/select/user/select-role";
import { PermissionRequest } from "@/lib/api/user/permission/request";
import { PermissionResponse } from "@/lib/api/user/permission/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../form";
import { useForm } from "antd/es/form/Form";
import { useTranslations } from "next-intl";

export default function FormAddUpdatePermission(
  props: CustomFormProps<PermissionRequest, PermissionResponse>
) {
  // React hooks
  const [form] = useForm<PermissionRequest>();
  const initialRequest: PermissionRequest = {};
  const [, setRequest] = useState<PermissionRequest | undefined>(
    initialRequest
  );

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: PermissionRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: PermissionRequest) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-permission"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemSelectRole
        disabled={props.disabled || (props.item?.role?.id ?? 0) > 0}
        defaultValue={props.item?.role?.id?.toString()}
        defaultOptions={props?.item?.role ? [props?.item?.role] : []}
        required={true}
        width={"100%"}
      />
      <FormItemSelectPermissionTable
        disabled={props.disabled}
        defaultValue={props.item?.tableName ?? undefined}
        required={true}
        width={"100%"}
      />
      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={props.item?.create ?? undefined}
        label={tWords("create")}
        name="create"
        required={true}
      />
      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={props.item?.read ?? undefined}
        label={tWords("read")}
        name="read"
        required={true}
      />
      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={props.item?.update ?? undefined}
        label={tWords("update")}
        name="update"
        required={true}
      />
      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={props.item?.delete ?? undefined}
        label={tWords("delete")}
        name="delete"
        required={true}
      />
    </CustomForm>
  );
}
