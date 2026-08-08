"use client";

import { SCHOOL_CURRENCIES } from "@/lib/constants/school/common/school";
import FormItemSelect, { FormItemSelectProps } from "../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectCurrency(
  props: FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "currency"}
      label={props.label || tWords("currency")}
      placeholder={props.placeholder || tWords("currency")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("currency") })
      }
      options={SCHOOL_CURRENCIES.map((item) => {
        return {
          data: item,
          label: item,
          value: item,
        };
      })}
    />
  );
}
