"use client";

import { useState } from "react";
import { UserResponse } from "@/lib/api/user/user/response";
import CustomForm, { CustomFormProps } from "@/components/form/form";
import { ProfileMessageRequest } from "@/lib/api/user/profile/request";
import { useForm } from "antd/es/form/Form";
import FormItemInputPhone from "@/components/form-item/input/input-phone";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import Link from "next/link";
import { App, Checkbox } from "@/ui/antd";
import { ArgsProps } from "antd/es/message";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export function FormUpdateProfileMessage(
  props: {
    addUsername?: boolean;
  } & CustomFormProps<ProfileMessageRequest, UserResponse>
) {
  // React hooks
  const [form] = useForm<ProfileMessageRequest>();
  const [policyAccepted, setPolicyAccepted] = useState(
    props.item?.config?.whatsappPhoneNumber ||
      props.item?.config?.telegramChatID
      ? true
      : false
  );
  const initialRequest: ProfileMessageRequest = {};
  const [, setRequest] = useState<ProfileMessageRequest | undefined>(
    initialRequest
  );

  // Next hooks
  const tSentences = useTranslations("Sentences.common");
  const tWords = useTranslations("Words");

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  const handleValuesChange = (values: ProfileMessageRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ProfileMessageRequest) => {
    if (policyAccepted !== true) {
      toastMessage({
        type: "warning",
        key: "policyNotAccepted",
        duration: 5,
        content: tSentences("policyNotAccepted"),
      });
      return;
    }
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-update-profile-message"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <div className="w-full flex flex-row items-center mb-4">
        <Checkbox
          disabled={props.disabled}
          defaultChecked={
            (props.item?.config?.whatsappPhoneNumber ?? 0) > 0 ||
            (props.item?.config?.telegramChatID ?? 0) > 0
              ? true
              : false
          }
          onChange={(e) => setPolicyAccepted(e.target.checked)}
        >
          <span className="w-auto text-ellipsis line-clamp-1">
            {tWords("acceptPolicy")}{" "}
            <Link href="/policy" target="_blank">
              {tWords("policy")}
            </Link>
          </span>
        </Checkbox>
      </div>

      <FormItemInputPhone
        disabled={props.disabled || !policyAccepted}
        defaultValue={
          props.item?.config?.whatsappPhoneNumber?.toString() ?? undefined
        }
        label={tWords("whatsappPhoneNumber")}
        name={"whatsappPhoneNumber"}
        required={false}
      />

      <FormItemInputNumber
        disabled={props.disabled || !policyAccepted}
        name="telegramChatID"
        label={tWords("telegramChatID")}
        defaultValue={props.item?.config?.telegramChatID ?? 0}
        min={0}
        step={0.01}
        precision={2}
        width="100%"
        rules={useDefaultFormRule({
          fielLabel: tWords("telegramChatID"),
          options: {
            required: false,
            min: 0,
          },
        })}
      />
    </CustomForm>
  );
}
