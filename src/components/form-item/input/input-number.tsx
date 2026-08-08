"use client";

import { FormItemInputProps } from "./input";
import { InputNumberProps } from "antd";
import { FormItem, InputNumber } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormItemInputNumber(
  props: {
    min?: number;
    max?: number;
  } & FormItemInputProps &
    InputNumberProps<number>
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
      <InputNumber<number>
        disabled={props.disabled}
        size={props.size ?? "middle"}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        prefix={props.prefix}
        suffix={props.suffix}
        type="number"
        formatter={props.formatter}
        parser={props.parser}
        style={{
          width: props.width,
          ...props.style,
        }}
        onChange={(value) => {
          props.onChange?.(value ?? 0);
        }}
      />
    </FormItem>
  );
}
