"use client";

import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import FormItemSelect from "../../select";
import { FormItemSelectProps } from "../../select";
import {
  REPORT_ENTRY_PERIOD_TYPES_UNIVERSITY,
  REPORT_ENTRY_PERIOD_TYPES_HIGHSCHOOL,
} from "@/lib/constants/school/common/report";
import { useTranslations } from "next-intl";

export default function FormItemSelectReportEntryPeriodType(
  props: {
    request?: {
      schoolType?: string;
    };
  } & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.report.periodType");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "periodType"}
      label={props.label || tWords("periodType")}
      placeholder={props.placeholder || tWords("periodType")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("periodType") })
      }
      options={(props.request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL
        ? REPORT_ENTRY_PERIOD_TYPES_HIGHSCHOOL
        : props.request?.schoolType === SCHOOL_TYPE_UNIVERSITY
          ? REPORT_ENTRY_PERIOD_TYPES_UNIVERSITY
          : []
      ).map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
