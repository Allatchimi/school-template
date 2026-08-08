"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemInputEmail from "@/components/form-item/input/input-email";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import { ManagerRequest } from "@/lib/api/school/common/manager/request";
import { ManagerResponse } from "@/lib/api/school/common/manager/response";
import { useState } from "react";
import { FormItemsUserInfo } from "../../user/form-add-update-user";
import FormItemInputPhone from "@/components/form-item/input/input-phone";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useForm } from "antd/es/form/Form";
import FormItemSelectUserStatus from "@/components/form-item/select/user/select-user-status";
import { USER_STATUS_ENABLED } from "@/lib/constants/user/user";
import FormItemSelectRole from "@/components/form-item/select/user/select-role";
import { FEATURE_DIRECTOR } from "@/lib/constants/user/feature";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateManager(
  props: CustomFormProps<ManagerRequest, ManagerResponse>
) {
  // React hooks
  const [form] = useForm<ManagerRequest>();
  const initialRequest: ManagerRequest = {
    schoolID: SchoolConfig.schoolID(),
    autoGenerateEmail: true,
  };
  const [request, setRequest] = useState<ManagerRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    autoGenerateEmail: initialRequest.autoGenerateEmail,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ManagerRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (
      request?.autoGenerateEmail !== newValues?.autoGenerateEmail &&
      (props.item?.user?.email?.length ?? 0) < 1
    ) {
      form.setFieldValue("email", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ManagerRequest) => {
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
      name={props.formName ?? "form-add-update-manager"}
      layout={"vertical"}
      className="w-full"
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
      <FormItemSelectRole
        disabled={props.disabled}
        defaultValue={props.item?.user?.role?.id?.toString()}
        request={{
          feature: FEATURE_DIRECTOR,
        }}
        defaultOptions={
          props?.item?.user?.role ? [props?.item?.user?.role] : []
        }
        required={true}
        width={"100%"}
      />

      {(props.item?.user?.email?.length ?? 0) < 1 && (
        <FormItemCheckbox
          disabled={props.disabled}
          defaultValue={initialRequest.autoGenerateEmail ?? undefined}
          label={tWords("autoGenerateEmail")}
          name="autoGenerateEmail"
          required={false}
        />
      )}
      <FormItemInputEmail
        disabled={
          ((props.item?.user?.email?.length ?? 0) < 1 &&
            request?.autoGenerateEmail === true) ||
          props.disabled
        }
        defaultValue={props.item?.user?.email ?? undefined}
        label={tWords("email")}
        name={"email"}
        placeholder={
          request?.autoGenerateEmail === true
            ? tWords("autoGenerateEmail")
            : tWords("email")
        }
        required={
          (props.item?.user?.email?.length ?? 0) < 1 &&
          request?.autoGenerateEmail === true
            ? false
            : true
        }
      />

      <FormItemInputPhone
        disabled={props.disabled}
        defaultValue={props.item?.user?.phoneNumber?.toString() ?? undefined}
        label={tWords("phoneNumber")}
        name={"phoneNumber"}
        required={false}
      />

      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.uid ?? undefined}
        label={tWords("uid")}
        name="uid"
        placeholder={tWords("uid")}
        rules={useDefaultFormRule({
          fielLabel: tWords("uid"),
          options: {
            required: false,
            max: 150,
          },
        })}
      />

      <FormItemSelectUserStatus
        disabled={props.disabled}
        defaultValue={props.item?.user?.status ?? USER_STATUS_ENABLED}
        required={true}
        width={"100%"}
      />

      <FormItemsUserInfo
        disabled={props.disabled}
        item={props.item?.user?.info ?? undefined}
        form={form}
        handleValuesChange={handleValuesChange}
      />
    </CustomForm>
  );
}
