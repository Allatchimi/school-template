"use client";

import FormItemSelect from "../../select";
import { SCHEDULE_TYPES } from "@/lib/constants/school/common/schedule";
import { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectScheduleType(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
    const tEnums = useTranslations("Enums.school.common.schedule.type");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "type"}
      label={props.label || tWords("type")}
      placeholder={props.placeholder || tWords("type")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("type") })
      }
      options={SCHEDULE_TYPES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
