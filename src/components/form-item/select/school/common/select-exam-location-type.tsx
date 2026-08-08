"use client";

import { EXAM_LOCATION_TYPES } from "@/lib/constants/school/common/exam";
import FormItemSelect, { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectExamLocationType(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.exam.locationType");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "locationType"}
      label={props.label || tWords("locationType")}
      placeholder={props.placeholder || tWords("locationType")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("locationType") })
      }
      options={EXAM_LOCATION_TYPES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
