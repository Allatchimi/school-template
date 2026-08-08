"use client";

import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectExam from "@/components/form-item/select/school/common/select-exam";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student";
import { SchoolConfig } from "@/config/school";
import { ResultRequest } from "@/lib/api/school/common/result/request";
import { ResultResponse } from "@/lib/api/school/common/result/response";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { CustomFormProps } from "../../form";
import CustomForm from "../../form";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { ExamResponse } from "@/lib/api/school/common/exam/response";
import { useTranslations } from "next-intl";

export default function FormAddUpdateResult(
  props: CustomFormProps<ResultRequest, ResultResponse>
) {
  // React hooks
  const [form] = useForm<ResultRequest>();
  const initialRequest: ResultRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
  };
  const [request, setRequest] = useState<ResultRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
  });
  const [selectedExam, setSelectedExam] = useState<ExamResponse | undefined>(
    props.item?.exam ?? undefined
  );

  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ResultRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    if (initialRequest?.schoolType) {
      newValues.schoolType = initialRequest.schoolType;
    } else if (request?.schoolType) {
      newValues.schoolType = request.schoolType;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.examID = undefined;
      newValues.studentID = undefined;
      form.setFieldValue("examID", undefined);
      form.setFieldValue("studentID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ResultRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      newValues.schoolType = undefined;
      props.onSubmit(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-result"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      {!initialRequest.schoolID ? (
        <FormItemSelectSchool
          disabled={props.disabled || (props.item?.school?.id ?? 0) > 0}
          defaultValue={props.item?.school?.id?.toString() ?? undefined}
          defaultOptions={props?.item?.school ? [props?.item?.school] : []}
          required={true}
          width={"100%"}
        />
      ) : undefined}
      <FormItemSelectExam
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.exam?.id?.toString() ?? undefined}
        defaultOptions={props?.item?.exam ? [props?.item?.exam] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
        onChange={(_value, option) => {
          if (option) {
            if (Array.isArray(option) && option.length > 0) {
              setSelectedExam(option[0].data);
            } else if (!Array.isArray(option)) {
              setSelectedExam(option.data);
            }
          }
        }}
      />
      <FormItemSelectStudent
        disabled={!request?.schoolID || !selectedExam?.id || props.disabled}
        defaultValue={props.item?.student?.id?.toString() ?? undefined}
        defaultOptions={props?.item?.student ? [props?.item?.student] : []}
        request={{ schoolID: request?.schoolID, examID: selectedExam?.id }}
        required={true}
        width={"100%"}
      />

      <FormItemInputNumber
        disabled={props.disabled}
        defaultValue={props.item?.score ?? undefined}
        label={tWords("score")}
        name="score"
        placeholder={tWords("score")}
        min={-1}
        step={0.01}
        precision={2}
        max={selectedExam?.notation ?? 20}
        suffix={` /${selectedExam?.notation ?? 20}`}
        width="100%"
        rules={[
          {
            required: true,
            message: tSentences("pleaseEnterValidLabel", {
              label: tWords("score"),
            }),
          },
        ]}
      />
    </CustomForm>
  );
}
