"use client";

import { useTranslations } from "next-intl";
import FormItemInput, { FormItemInputProps } from "./input";

export default function FormItemInputPhone(props: FormItemInputProps) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemInput
      {...props}
      name={props.name || "phoneNumber"}
      label={props.label || tWords("phoneNumber")}
      placeholder={props.placeholder || tWords("phoneNumber")}
      type="tel"
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseEnterValidLabel", {
          label: tWords("phoneNumber"),
        })
      }
      rules={
        props.required === true
          ? [
              {
                type: "number",
                required: true,
                message:
                  props.requiredMsg ||
                  tSentences("pleaseEnterValidLabel", {
                    label: tWords("phoneNumber"),
                  }),
              },
            ]
          : []
      }
    />
  );
}
