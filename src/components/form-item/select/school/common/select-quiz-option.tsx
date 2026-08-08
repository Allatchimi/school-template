"use client";

import FormItemSelect, { FormItemSelectProps } from "../../select";
import { QuizQuestionOptionResponse } from "@/lib/api/school/common/quiz/response";
import SelectLabelQuizOption from "@/components/form-item/select-label/school/common/select-label-quiz-option";
import { useTranslations } from "next-intl";

export default function FormItemSelectQuizOption(
  props: {
    defaultOptions?: QuizQuestionOptionResponse[];
  } & FormItemSelectProps<QuizQuestionOptionResponse>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelect<QuizQuestionOptionResponse>
      {...props}
      name={props.name || "optionID"}
      label={props.label || tWords("option")}
      placeholder={props.placeholder || tWords("option")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("option") })
      }
      options={getOptionsFromData(props.defaultOptions)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelQuizOption item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (data?: QuizQuestionOptionResponse[] | null) => {
  return (
    data?.map((item) => {
      return {
        data: item,
        label: item.title ?? "",
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
