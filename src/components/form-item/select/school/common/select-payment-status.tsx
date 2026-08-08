"use client";

import { PAYMENT_STATUS } from "@/lib/constants/school/common/payment";
import FormItemSelect, { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectPaymentStatus(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.payment.status");

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
      options={PAYMENT_STATUS.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
