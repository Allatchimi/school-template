"use client";

import { useTranslations } from "next-intl";
import FormItemInput, { FormItemInputProps } from "./input";

export default function FormItemInputEmail(props: FormItemInputProps) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemInput
      {...props}
      type="text"
      name={props.name || "email"}
      label={props.label || tWords("email")}
      placeholder={props.placeholder || tWords("email")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseEnterValidLabel", {
          label: tWords("email"),
        })
      }
      rules={
        props.required === true
          ? [
              {
                type: "email",
                required: true,
                message: tSentences("pleaseEnterValidLabel", {
                  label: tWords("email"),
                }),
              },
            ]
          : props.rules
      }
    />
  );
}
