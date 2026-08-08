"use client";

import SelectLabelQuiz from "@/components/form-item/select-label/school/common/select-label-quiz";
import { QuizListRequest } from "@/lib/api/school/common/quiz/request";
import {
  QuizResponse,
  QuizListResponse,
} from "@/lib/api/school/common/quiz/response";
import { getQuizList } from "@/lib/api/school/common/quiz/routes";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectQuiz(
  props: FormItemSelectFetchProps<
    QuizResponse,
    QuizListRequest,
    QuizListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<QuizResponse, QuizListRequest, QuizListResponse>
      {...props}
      name={props.name || "quizID"}
      label={props.label || tWords("quiz")}
      placeholder={props.placeholder || tWords("quiz")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("quiz") })
      }
      getItemList={getQuizList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelQuiz item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: QuizResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const title =
        item.title || tWords("invalidLabel", { label: tWords("title") });
      const classSubjectUnit =
        item?.school?.type === SCHOOL_TYPE_UNIVERSITY
          ? `(${item.unit?.name || tWords("invalidLabel", { label: tWords("unit") })})`
          : `(${item.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
              item.classSubject?.class?.name ||
              tWords("invalidLabel", { label: tWords("class") })
            })`;
      return {
        data: item,
        label: `${title} (${classSubjectUnit})`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
