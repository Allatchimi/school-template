"use client";

import FormItemSelect from "../../select";
import { REQUEST_AUDIENCES } from "@/lib/constants/school/common/request";
import { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectRequestAudience(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.request.audience");

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
      options={REQUEST_AUDIENCES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
