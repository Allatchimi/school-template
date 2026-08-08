"use client";

import { REPORT_GRADE_TYPES } from "@/lib/constants/school/common/report";
import FormItemSelect, { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectReportGradeType(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.report.gradeType");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "type"}
      label={props.label || tWords("type")}
      placeholder={props.placeholder || tWords("type")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectThe", { label: tWords("type") })
      }
      options={REPORT_GRADE_TYPES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
