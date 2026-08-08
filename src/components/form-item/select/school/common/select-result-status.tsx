"use client";

import { useTranslations } from "next-intl";
import FormItemSelect from "../../select";
import { FormItemSelectProps } from "../../select";
import { RESULT_STATUSES } from "@/lib/constants/school/common/result";

export default function FormItemSelectResultStatus(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.result.status");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "status"}
      label={props.label || tWords("status")}
      placeholder={props.placeholder || tWords("status")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectThe", { label: tWords("status") })
      }
      options={RESULT_STATUSES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
