"use client";

import { useState } from "react";
import FormItemDate from "@/components/form-item/date/date";
import FormItemSelectGender from "@/components/form-item/select/user/select-gender";
import FormItemSelectLanguage from "@/components/form-item/select/user/select-language";
import { UserResponse } from "@/lib/api/user/user/response";
import FormItemInputText from "@/components/form-item/input/input-text";
import CustomForm, { CustomFormProps } from "@/components/form/form";
import { ProfileRequest } from "@/lib/api/user/profile/request";
import { useForm } from "antd/es/form/Form";
import FormItemUploadImageCrop from "@/components/form-item/upload/upload-image-crop";
import { useTranslations } from "next-intl";

export function FormUpdateProfile(
  props: {
    addUsername?: boolean;
  } & CustomFormProps<ProfileRequest, UserResponse>
) {
  // React hooks
  const [form] = useForm<ProfileRequest>();
  const initialRequest: ProfileRequest = {};
  const [, setRequest] = useState<ProfileRequest | undefined>(initialRequest);

  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form");
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ProfileRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ProfileRequest) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-update-profile"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemUploadImageCrop
        disabled={props.disabled}
        defaultValue={[props.item?.info?.image ?? ""]}
        label={tWords("avatarImage")}
        name="image"
        imgWidth={512}
        imgHeight={512}
        maxCount={1}
        onChange={(fileList) => {
          form.setFieldValue("image", fileList);
          handleValuesChange(form.getFieldsValue());
        }}
      />

      {props.addUsername === true && (
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.username ?? undefined}
          label={tWords("username")}
          name="username"
          placeholder={tSentences("placeholder.enterThe", {
            label: tWords("username").toLowerCase(),
          })}
        />
      )}

      <div className="w-full grid grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.firstName ?? undefined}
          label={tWords("firstName")}
          name="firstName"
          placeholder={tSentences("placeholder.enterThe", {
            label: tWords("firstName").toLowerCase(),
          })}
          rules={[
            {
              required: true,
              message: "Please enter the first name!",
            },
          ]}
        />

        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.lastName ?? undefined}
          label={tWords("lastName")}
          name="lastName"
          placeholder={tSentences("placeholder.enterThe", {
            label: tWords("lastName").toLowerCase(),
          })}
          rules={[
            {
              required: true,
              message: "Please enter the last name!",
            },
          ]}
        />
      </div>

      <FormItemSelectGender
        disabled={props.disabled}
        defaultValue={props.item?.info?.gender ?? undefined}
        required={true}
        placeholder={tSentences("placeholder.selectThe", {
          label: tWords("gender").toLowerCase(),
        })}
        width={"100%"}
      />

      <div className="w-full grid grid-cols-2 gap-4">
        <FormItemDate
          disabled={props.disabled}
          defaultValue={props.item?.info?.birthday ?? undefined}
          label={tWords("birthday")}
          name="birthday"
          required={true}
          width={"100%"}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.birthLocation ?? undefined}
          label={tWords("birthLocation")}
          name="birthLocation"
          placeholder={tSentences("placeholder.enterThe", {
            label: tWords("birthLocation").toLowerCase(),
          })}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.address ?? undefined}
          label={tWords("address")}
          name="address"
          placeholder={tSentences("placeholder.enterThe", {
            label: tWords("address").toLowerCase(),
          })}
        />

        <FormItemSelectLanguage
          disabled={props.disabled}
          defaultValue={props.item?.info?.language ?? undefined}
          width={"100%"}
        />
      </div>
    </CustomForm>
  );
}
