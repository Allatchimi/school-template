"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemDate from "@/components/form-item/date/date";
import FormItemInputEmail from "@/components/form-item/input/input-email";
import FormItemInputPhone from "@/components/form-item/input/input-phone";
import FormItemSelectGender from "@/components/form-item/select/user/select-gender";
import FormItemSelectLanguage from "@/components/form-item/select/user/select-language";
import FormItemSelectRole from "@/components/form-item/select/user/select-role";
import { UserRequest } from "@/lib/api/user/user/request";
import { UserInfoResponse, UserResponse } from "@/lib/api/user/user/response";
import CustomForm, { CustomFormProps } from "../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useState } from "react";
import { FormInstance, useForm } from "antd/es/form/Form";
import FormItemUploadImageCrop from "@/components/form-item/upload/upload-image-crop";
import FormItemSelectUserStatus from "@/components/form-item/select/user/select-user-status";
import { USER_STATUS_ENABLED } from "@/lib/constants/user/user";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { LANGUAGE_ENGLISH } from "@/lib/constants/user/language";
import { SchoolConfig } from "@/config/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateUser(
  props: CustomFormProps<UserRequest, UserResponse>
) {
  // React hooks
  const [form] = useForm<UserRequest>();
  const initialRequest: UserRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [, setRequest] = useState<UserRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: UserRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: UserRequest) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-user"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemSelectSchool
        disabled={props.disabled || (props.item?.school?.id ?? 0) > 0}
        defaultValue={props.item?.school?.id?.toString()}
        defaultOptions={props?.item?.school ? [props?.item?.school] : []}
        allowEmptySelection={true}
        allowEmptySelectionLabel="*"
        required={false}
        width={"100%"}
      />

      <FormItemSelectRole
        disabled={props.disabled}
        defaultValue={props.item?.role?.id?.toString()}
        defaultOptions={props?.item?.role ? [props?.item?.role] : []}
        required={true}
        width={"100%"}
      />

      <FormItemInputEmail
        disabled={props.disabled}
        defaultValue={props.item?.email ?? undefined}
        label={tWords("email")}
        name="email"
        required={true}
      />
      <FormItemInputPhone
        disabled={props.disabled}
        defaultValue={props.item?.phoneNumber?.toString() ?? undefined}
        label={tWords("phoneNumber")}
        name="phoneNumber"
        required={false}
      />

      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={props.item?.isActivated ?? true}
        label={tWords("isActivated")}
        name="isActivated"
        required={true}
      />

      <FormItemSelectUserStatus
        disabled={props.disabled}
        defaultValue={props.item?.status ?? USER_STATUS_ENABLED}
        required={true}
        width={"100%"}
      />

      <FormItemsUserInfo
        disabled={props.disabled}
        item={props.item?.info ?? undefined}
        addUsername={false}
        form={form}
        handleValuesChange={handleValuesChange}
      />
    </CustomForm>
  );
}

export function FormItemsUserInfo(props: {
  disabled?: boolean;
  item?: UserInfoResponse | null;
  addUsername?: boolean;
  form?: FormInstance<UserRequest>;
  handleValuesChange?: (values: UserRequest) => void;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-full flex flex-col">
      <FormItemUploadImageCrop
        disabled={props.disabled}
        defaultValue={[props.item?.image ?? ""]}
        label={tWords("image")}
        name={["info", "image"]}
        imgWidth={512}
        imgHeight={512}
        maxCount={1}
        onChange={(fileList) => {
          props.form?.setFieldValue?.(["info", "image"], fileList);
          const values = props.form?.getFieldsValue?.();
          if (values) {
            props.handleValuesChange?.(values);
          }
        }}
      />
      {props.addUsername === true && (
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.username ?? undefined}
          label={tWords("username")}
          name={["info", "username"]}
          placeholder={tWords("username")}
        />
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.firstName ?? undefined}
          label={tWords("firstName")}
          name={["info", "firstName"]}
          placeholder={tWords("firstName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("firstName"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.lastName ?? undefined}
          label={tWords("lastName")}
          name={["info", "lastName"]}
          placeholder={tWords("lastName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("lastName"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />
      </div>

      <FormItemSelectGender
        disabled={props.disabled}
        defaultValue={props.item?.gender ?? undefined}
        name={["info", "gender"]}
        required={true}
        width={"100%"}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemDate
          disabled={props.disabled}
          defaultValue={props.item?.birthday ?? undefined}
          label={tWords("birthday")}
          name={["info", "birthday"]}
          required={false}
          width={"100%"}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.birthLocation ?? undefined}
          label={tWords("birthLocation")}
          name={["info", "birthLocation"]}
          placeholder={tWords("birthLocation")}
          rules={useDefaultFormRule({
            fielLabel: tWords("birthLocation"),
            options: {
              required: false,
              max: 150,
            },
          })}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.address ?? undefined}
          label={tWords("address")}
          name={["info", "address"]}
          placeholder={tWords("address")}
          rules={useDefaultFormRule({
            fielLabel: tWords("address"),
            options: {
              required: false,
              max: 150,
            },
          })}
        />

        <FormItemSelectLanguage
          disabled={props.disabled}
          defaultValue={props.item?.language ?? LANGUAGE_ENGLISH}
          name={["info", "language"]}
          width={"100%"}
        />
      </div>
    </div>
  );
}
