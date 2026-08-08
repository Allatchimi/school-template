"use client";

import { DATE_FORMAT, parseDateTime } from "@/helpers/date/format";
import { FormItemDateTimeProps } from "./date-time";
import { FormItem, DatePicker } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormItemDate(props: FormItemDateTimeProps) {
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
        allowClear={false}
        disabled={props.disabled}
        format={DATE_FORMAT}
        size={props.size ?? "middle"}
        placeholder={tWords("date")}
        style={{ width: props.width }}
      />
    </FormItem>
  );
}
