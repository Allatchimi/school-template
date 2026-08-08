"use client";

import { LockOutlined } from "@ant-design/icons";
import { FormItemInputProps } from "./input";
import { FormItem, InputPassword } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormItemInputConfirmPassword(
  props: FormItemInputProps
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  const margin: React.CSSProperties =
    props.noMargin === true
      ? {
          margin: "0px",
        }
      : {};
  return (
    <FormItem
      name={props.name || "confirmPassword"}
      label={props.label || tWords("confirmPassword")}
      dependencies={["password"]}
      rules={
        props.required === true
          ? [
              {
                required: true,
                message:
                  props.requiredMsg ??
                  tSentences("pleaseEnterValidLabel", {
                    label: tWords("password"),
                  }),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(tSentences("passwordDoesNotMatch"))
                  );
                },
              }),
            ]
          : props.rules
      }
      tooltip={props.tooltip}
      noStyle={props.noStyle}
      style={{
        ...margin,
      }}
    >
      <InputPassword
        disabled={props.disabled}
        prefix={<LockOutlined />}
        type="password"
        placeholder={props.placeholder || tWords("confirmPassword")}
        size={props.size}
        style={{
          width: props.width,
          ...props.style,
        }}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
      />
    </FormItem>
  );
}
