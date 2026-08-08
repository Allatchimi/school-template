"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import { QuizRequest } from "@/lib/api/school/common/quiz/request";
import {
  QuizQuestionOptionResponse,
  QuizResponse,
} from "@/lib/api/school/common/quiz/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { FormListFieldData } from "antd";
import FormItemSelectQuizStatus from "@/components/form-item/select/school/common/select-quiz-status";
import { useState } from "react";
import { SchoolConfig } from "@/config/school";
import FormItemFormListDynamic from "@/components/form-item/form-list/form-list-dynamic";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useForm } from "antd/es/form/Form";
import FormItemSelect from "@/components/form-item/select/select";
import { QUIZ_STATUS_DRAFT } from "@/lib/constants/school/common/quiz";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateQuiz(
  props: CustomFormProps<QuizRequest, QuizResponse>
) {
  // React hooks
  const [form] = useForm<QuizRequest>();
  const initialRequest: QuizRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setRequest] = useState<QuizRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: QuizRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    if (initialRequest?.schoolType) {
      newValues.schoolType = initialRequest.schoolType;
    } else if (request?.schoolType) {
      newValues.schoolType = request.schoolType;
    }
    if (initialRequest?.yearID) {
      newValues.yearID = initialRequest.yearID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.yearID = undefined;
      newValues.classSubjectID = undefined;
      newValues.unitID = undefined;
      form.setFieldValue("yearID", undefined);
      form.setFieldValue("classSubjectID", undefined);
      form.setFieldValue("unitID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: QuizRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      if (initialRequest?.schoolID) {
        newValues.schoolID = initialRequest.schoolID;
      }
      if (initialRequest?.yearID) {
        newValues.yearID = initialRequest.yearID;
      }
      props.onSubmit(newValues);
    }
  };

  const updateSchoolType = (schoolType: string | null | undefined) => {
    const newValues = {
      ...form.getFieldsValue(),
      schoolType: schoolType,
    };
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-quiz"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      {!initialRequest.schoolID ? (
        <FormItemSelectSchool
          disabled={props.disabled || (props.item?.school?.id ?? 0) > 0}
          defaultValue={props.item?.school?.id?.toString()}
          defaultOptions={props?.item?.school ? [props?.item?.school] : []}
          onChangeFormatted={(value) => updateSchoolType(value?.type)}
          required={true}
          width={"100%"}
        />
      ) : undefined}
      {!initialRequest.yearID ? (
        <FormItemSelectYear
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.year?.id?.toString()}
          defaultOptions={props?.item?.year ? [props?.item?.year] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : undefined}

      {request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
        <FormItemSelectClassSubject
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.classSubject?.id?.toString()}
          defaultOptions={
            props?.item?.classSubject ? [props?.item?.classSubject] : []
          }
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : request?.schoolType === SCHOOL_TYPE_UNIVERSITY ? (
        <FormItemSelectUnit
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.unit?.id?.toString()}
          defaultOptions={props?.item?.unit ? [props?.item?.unit] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : (
        <FormItemSelect
          disabled={true}
          name="classSubjectUnitID"
          label={tWords("subjectUnit")}
          placeholder={tWords("subjectUnit")}
          required={true}
          width={"100%"}
        />
      )}

      <FormItemInputText
        disabled={props.disabled}
        label={tWords("title")}
        name="title"
        placeholder={tWords("title")}
        defaultValue={props.item?.title ?? undefined}
        rules={useDefaultFormRule({
          fielLabel: tWords("title"),
          options: {
            required: true,
            max: 150,
          },
        })}
      />

      <FormItemInputText
        disabled={props.disabled}
        label={tWords("description")}
        name="description"
        placeholder={tWords("description")}
        defaultValue={props.item?.description ?? undefined}
        rules={useDefaultFormRule({
          fielLabel: tWords("description"),
          options: {
            required: false,
            max: 500,
          },
        })}
      />

      <FormItemSelectQuizStatus
        disabled={props.disabled}
        defaultValue={props.item?.status ?? QUIZ_STATUS_DRAFT}
        required={true}
        width={"100%"}
      />

      <FormItemFormListDynamic<{
        question?: { title?: string | null; description?: string | null };
        options?:
          | {
              title?: string | null;
              description?: string | null;
            }[]
          | null;
      }>
        disabled={props.disabled}
        defaultValue={
          props.item?.questions?.map((itemQuestion) => {
            return {
              question: {
                title: itemQuestion.question?.title,
                description: itemQuestion.question?.description,
              },
              options: itemQuestion.options?.map((itemOption) => {
                return {
                  title: itemOption.title,
                  description: itemOption?.description,
                };
              }),
            };
          }) ?? undefined
        }
        name="questions"
        label={tWords("questions")}
        labelRow={tWords("question")}
        required={false}
        returnFormListRowTemplate={(field, index) => {
          return (
            <FormAddUpdateQuizQuestion
              disabled={props.disabled}
              field={field}
              defaultValue={
                props.item?.questions &&
                (props.item?.questions?.length ?? 0) > 0
                  ? (props.item?.questions?.[index ?? 0]?.options ?? undefined)
                  : undefined
              }
            />
          );
        }}
      />
    </CustomForm>
  );
}

function FormAddUpdateQuizQuestion(props: {
  disabled?: boolean;
  formName?: string;
  field: FormListFieldData;
  defaultValue?: QuizQuestionOptionResponse[];
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div key={props.field.key} className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          label={tWords("title")}
          name={[props.field.name.toString(), "question", "title"]}
          placeholder={tWords("title")}
          rules={useDefaultFormRule({
            fielLabel: tWords("title"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          label={tWords("description")}
          name={[props.field.name.toString(), "question", "description"]}
          placeholder={tWords("description")}
          rules={useDefaultFormRule({
            fielLabel: tWords("description"),
            options: {
              required: false,
              max: 500,
            },
          })}
        />
      </div>

      <FormItemFormListDynamic<{
        title?: string | null;
        description?: string | null;
      }>
        disabled={props.disabled}
        defaultValue={
          props.defaultValue?.map((item) => {
            return {
              title: item.title,
              description: item.description,
            };
          }) ?? []
        }
        name={[props.field.name.toString(), "options"]}
        label={tWords("options")}
        labelRow={tWords("option")}
        required={false}
        returnFormListRowTemplate={(field) => {
          return (
            <FormAddUpdateQuizOption disabled={props.disabled} field={field} />
          );
        }}
      />
    </div>
  );
}

function FormAddUpdateQuizOption(props: {
  disabled?: boolean;
  formName?: string;
  field: FormListFieldData;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div key={props.field.key} className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          label={tWords("title")}
          name={[props.field.name.toString(), "title"]}
          placeholder={tWords("title")}
          rules={useDefaultFormRule({
            fielLabel: tWords("title"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          label={tWords("description")}
          name={[props.field.name.toString(), "description"]}
          placeholder={tWords("description")}
          rules={useDefaultFormRule({
            fielLabel: tWords("description"),
            options: {
              required: false,
              max: 500,
            },
          })}
        />
      </div>
    </div>
  );
}
