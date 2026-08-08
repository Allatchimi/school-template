"use client";

import { PAYMENT_METHODS } from "@/lib/constants/school/common/payment";
import FormItemSelect, { FormItemSelectProps } from "../../select";
import { useTranslations } from "next-intl";

export default function FormItemSelectPaymentMethod(
  props: {} & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.payment.method");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "method"}
      label={props.label || tWords("paymentMethod")}
      placeholder={props.placeholder || tWords("paymentMethod")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("paymentMethod") })
      }
      options={PAYMENT_METHODS.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
