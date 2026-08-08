"use client";

import { USER_STATUSES } from "@/lib/constants/user/user";
import FormItemSelect, { FormItemSelectProps } from "../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectUserStatus(
  props: FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.status");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "status"}
      label={props.label || tWords("status")}
      placeholder={props.placeholder || tWords("status")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("status") })
      }
      options={USER_STATUSES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
