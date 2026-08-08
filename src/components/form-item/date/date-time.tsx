"use client";

import { DATE_TIME_FORMAT, parseDateTime } from "@/helpers/date/format";
import { DateType } from "@/types/http/base-response";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { FormItem, DatePicker } from "@/ui/antd";
import { useTranslations } from "next-intl";

export interface FormItemDateTimeProps {
  disabled?: boolean;
  defaultValue?: DateType;
  label?: string;
  name?: string | string[];
  size?: SizeType;
  required?: boolean;
  width?: string | number;
}

export default function FormItemDateTime(props: FormItemDateTimeProps) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  const formattedDefaultValue = parseDateTime(props.defaultValue?.toString());
  return (
    <FormItem
      label={props.label}
      name={props.name}
      initialValue={formattedDefaultValue}
      getValueProps={(i) => ({ value: i })}
      style={{ width: props.width }}
      rules={
        props.required === true
          ? [
              {
                required: props.required,
                message: tSentences("pleaseSelectTheLabel", {
                  label: tWords("date"),
                }),
              },
            ]
          : []
      }
    >
      <DatePicker
        showTime
        disabled={props.disabled}
        format={DATE_TIME_FORMAT}
        size={props.size ?? "middle"}
        placeholder={tWords("date")}
        style={{ width: props.width }}
      />
    </FormItem>
  );
}
