"use client";

import { useTranslations } from "next-intl";
import FormItemSelect, { FormItemSelectProps } from "../select";
import { GENDERS } from "@/lib/constants/user/gender";

export default function FormItemSelectGender(
  props: FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.gender");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "gender"}
      label={props.label || tWords("gender")}
      placeholder={props.placeholder || tWords("gender")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("gender") })
      }
      options={GENDERS.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
