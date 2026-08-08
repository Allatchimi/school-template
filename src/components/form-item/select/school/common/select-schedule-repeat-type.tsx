"use client";

import FormItemSelect from "../../select";
import { SCHEDULE_REPEAT_TYPES } from "@/lib/constants/school/common/schedule";
import { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectScheduleRepeatType(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
    const tEnums = useTranslations("Enums.school.common.schedule.repeatType");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "repeatType"}
      label={props.label || tWords("repeatType")}
      placeholder={props.placeholder || tWords("repeatType")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("repeatType") })
      }
      options={SCHEDULE_REPEAT_TYPES.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
