"use client";

import { EXAM_STATUSES } from "@/lib/constants/school/common/exam";
import FormItemSelect, { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectExamStatus(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.exam.status");

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
      options={EXAM_STATUSES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
