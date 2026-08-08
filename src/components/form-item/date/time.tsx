"use client";

import { parseTimeShort, TIME_FORMAT_SHORT } from "@/helpers/date/format";
import { FormItemDateTimeProps } from "./date-time";
import { FormItem, TimePicker } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormItemTime(props: FormItemDateTimeProps) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  const formattedDefaultValue = parseTimeShort(props.defaultValue?.toString());
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
                  label: tWords("time"),
                }),
              },
            ]
          : []
      }
    >
      <TimePicker
        allowClear={false}
        disabled={props.disabled}
        format={TIME_FORMAT_SHORT}
        placeholder={tWords("time")}
        size={props.size ?? "middle"}
        style={{ width: props.width }}
      />
    </FormItem>
  );
}
