"use client";

import { LANGUAGES } from "@/lib/constants/user/language";
import FormItemSelect, { FormItemSelectProps } from "../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectLanguage(
  props: FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.language");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "language"}
      label={props.label || tWords("language")}
      placeholder={props.placeholder || tWords("language")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("language") })
      }
      options={LANGUAGES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
