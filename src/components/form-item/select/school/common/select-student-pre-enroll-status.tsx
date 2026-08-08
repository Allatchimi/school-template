"use client";

import { STUDENT_PRE_ENROLL_STATUSES } from "@/lib/constants/school/common/student";
import FormItemSelect, { FormItemSelectProps } from "../../select";
import { StudentEnrollListRequest } from "@/lib/api/school/common/student/request";
import { useTranslations } from "next-intl";

export default function FormItemSelectStudentPreEnrollStatus(
  props: {
    request?: StudentEnrollListRequest;
  } & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.student.preEnrollStatus");

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
      options={STUDENT_PRE_ENROLL_STATUSES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
