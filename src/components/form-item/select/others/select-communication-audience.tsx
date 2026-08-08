"use client";

import {
  AUDIENCE_TYPE_ALL,
  AUDIENCE_TYPES,
} from "@/lib/constants/others/communication";
import FormItemSelect, { FormItemSelectProps } from "../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectCommunicationAudience(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.others.communication.audience");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "audience"}
      label={props.label || tWords("audience")}
      placeholder={props.placeholder || tWords("audience")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("audience") })
      }
      options={AUDIENCE_TYPES.map((item) => {
        return {
          data: item,
          label: item === AUDIENCE_TYPE_ALL ? item : tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
