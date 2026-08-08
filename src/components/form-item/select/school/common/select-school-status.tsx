"use client";

import { SCHOOL_STATUSES } from "@/lib/constants/school/common/school";
import FormItemSelect from "../../select";
import { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectSchoolStatus(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.status");

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
      options={SCHOOL_STATUSES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
