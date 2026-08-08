"use client";

import { useTranslations } from "next-intl";
import { FormItemInputProps } from "./input";
import { FormItem, InputOTP } from "@/ui/antd";

export default function FormItemInputOtp(props: FormItemInputProps) {
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
      name={props.name || "code"}
      label={props.label}
      rules={
        props.required === true
          ? [
              {
                required: true,
                message:
                  props.requiredMsg ??
                  tSentences("pleaseEnterValidLabel", {
                    label: tWords("value"),
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
      <InputOTP
        length={6}
        disabled={props.disabled}
        size={props.size}
        type={props.type || "string"}
        style={{
          width: props.width,
          ...props.style,
        }}
      />
    </FormItem>
  );
}
