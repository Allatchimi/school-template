"use client";

import FormItemSelect from "../../select";
import { SCHEDULE_DAY_OF_THE_WEEKS } from "@/lib/constants/school/common/schedule";
import { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectScheduleDayOfTheWeek(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
    const tEnums = useTranslations("Enums.school.common.schedule.dayOfTheWeek");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "dayOfTheWeek"}
      label={props.label || tWords("dayOfTheWeek")}
      placeholder={props.placeholder || tWords("dayOfTheWeek")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("dayOfTheWeek") })
      }
      options={SCHEDULE_DAY_OF_THE_WEEKS.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
