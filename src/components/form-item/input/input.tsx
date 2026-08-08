"use client";

import { Rule } from "antd/es/form";
import { InputProps } from "antd";
import { FormItem, Input } from "@/ui/antd";
import { useTranslations } from "next-intl";

type PropsOmitFields = Omit<InputProps, "name" | "onChange">;

export interface FormItemInputProps extends PropsOmitFields {
  name?: string | string[];
  label?: string;
  tooltip?: string;
  requiredMsg?: string;
  rules?: Rule[];
  noMargin?: boolean;
  noStyle?: boolean;
  onChange?: (value: string | number) => void;
}

export default function FormItemInput(props: FormItemInputProps) {
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
      <Input
        disabled={props.disabled}
        size={props.size}
        placeholder={props.placeholder}
        prefix={props.prefix}
        suffix={props.suffix}
        type={props.type || "text"}
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
