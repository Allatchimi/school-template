"use client";

import { useTranslations } from "next-intl";
import { FormItemInputProps } from "./input";
import { FormItem, InputTextArea } from "@/ui/antd";

export default function FormItemInputTextArea(
  props: {
    rows?: number;
  } & FormItemInputProps
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
      label={props.label}
      name={props.name}
      initialValue={props.defaultValue}
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
      <InputTextArea
        disabled={props.disabled}
        size={props.size}
        placeholder={props.placeholder}
        rows={(props.rows ?? 0) > 0 ? props.rows : 4}
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
