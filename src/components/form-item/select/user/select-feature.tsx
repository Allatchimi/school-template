"use client";

import { FEATURES } from "@/lib/constants/user/feature";
import FormItemSelect, { FormItemSelectProps } from "../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectFeature(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.permission.feature");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "feature"}
      label={props.label || tWords("feature")}
      placeholder={props.placeholder || tWords("feature")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("feature") })
      }
      options={FEATURES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
