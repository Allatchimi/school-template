"use client";

import FormItemSelect from "../../select";
import { REQUEST_STATUSES } from "@/lib/constants/school/common/request";
import { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectRequestStatus(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.request.status");

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
      options={REQUEST_STATUSES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
