"use client";

import { QuizAnswerRequest } from "@/lib/api/school/common/quiz/request";
import {
  QuizAnswerResponse,
  QuizQuestionOptionResponse,
  QuizQuestionResponse,
  QuizResponse,
} from "@/lib/api/school/common/quiz/response";
import { FormListFieldData } from "antd";
import FormItemSelectQuizOption from "@/components/form-item/select/school/common/select-quiz-option";
import FormItemFormListStatic from "@/components/form-item/form-list/form-list-static";
import FormItemInputHidden from "@/components/form-item/input/input-hidden";
import CustomForm, { CustomFormProps } from "../../form";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { List, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormAddUpdateQuizAnswer(
  props: {
    quiz?: QuizResponse;
  } & CustomFormProps<QuizAnswerRequest, QuizAnswerResponse>
) {
  // React hooks
  const [form] = useForm<QuizAnswerRequest>();
  const initialRequest: QuizAnswerRequest = {};
  const [, setRequest] = useState<QuizAnswerRequest | undefined>(
    initialRequest
  );

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: QuizAnswerRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: QuizAnswerRequest) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-quiz-answer"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      {(props.quiz?.questions?.length ?? 0) < 1 ? (
        <List />
      ) : (
        <FormItemFormListStatic<{
          question?: QuizQuestionResponse | null;
          answer?: QuizQuestionOptionResponse | null;
          options?: QuizQuestionOptionResponse[] | null;
        }>
          disabled={props.disabled}
          defaultValue={
            props?.quiz?.questions?.map((item) => {
              return {
                question: item.question,
                options: item.options,
              };
            }) ?? []
          }
          name="answers"
          labelRow={tWords("question")}
          required={false}
          returnFormListRowTemplate={(field, index) => {
            return (
              <FormAddUpdateQuizAnswerQuestion
                disabled={props.disabled}
                field={field}
                defaultValue={
                  props?.quiz?.questions?.map((item) => {
                    return {
                      question: item.question,
                      options: item.options,
                    };
                  })?.[index ?? 0] ?? {}
                }
                index={index}
              />
            );
          }}
        />
      )}
    </CustomForm>
  );
}

function FormAddUpdateQuizAnswerQuestion(props: {
  disabled?: boolean;
  formName?: string;
  field: FormListFieldData;
  defaultValue?: {
    question?: QuizQuestionResponse | null;
    answer?: QuizQuestionOptionResponse | null;
    options?: QuizQuestionOptionResponse[] | null;
  };
  index?: number;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div key={props.field.key} className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col">
          <Text disabled={props.disabled}>
            {props.defaultValue?.question?.title}
          </Text>
          <Text type="secondary" disabled={props.disabled}>
            {props.defaultValue?.question?.description}
          </Text>
          <FormItemInputHidden
            name={[props.field.name.toString(), "questionID"]}
            defaultValue={
              props.defaultValue?.question?.id?.toString() ?? undefined
            }
          />
        </div>
        <FormItemSelectQuizOption
          disabled={props.disabled}
          defaultValue={props.defaultValue?.answer?.id?.toString() ?? undefined}
          defaultOptions={props.defaultValue?.options ?? undefined}
          label={tWords("answer")}
          name={[props.field.name.toString(), "optionID"]}
          placeholder={tWords("answer")}
          required={true}
          width={"100%"}
        />
      </div>
    </div>
  );
}
