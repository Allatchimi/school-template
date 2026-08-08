"use client";

import { LockOutlined } from "@ant-design/icons";
import { FormItemInputProps } from "./input";
import { FormItem, InputPassword } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormItemInputPassword(props: FormItemInputProps) {
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
      name={props.name || "password"}
      label={props.label || tWords("password")}
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
        placeholder={props.placeholder || tWords("password")}
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
