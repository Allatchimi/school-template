"use client";

import FormItemInputTextArea from "@/components/form-item/input/input-text-area";
import { StudentPreEnrollStatusRequest } from "@/lib/api/school/common/student/request";
import { StudentPreEnrollResponse } from "@/lib/api/school/common/student/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import FormItemSelectStudentPreEnrollStatusStatus from "@/components/form-item/select/school/common/select-student-pre-enroll-status";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateStudentPreEnrollStatus(
  props: CustomFormProps<
    StudentPreEnrollStatusRequest,
    StudentPreEnrollResponse
  >
) {
  // React hooks
  const [form] = useForm<StudentPreEnrollStatusRequest>();
  const initialRequest: StudentPreEnrollStatusRequest = {};
  const [, setRequest] = useState<StudentPreEnrollStatusRequest | undefined>(
    initialRequest
  );

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: StudentPreEnrollStatusRequest) => {
    const newValues = values;

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: StudentPreEnrollStatusRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      props.onSubmit(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-student-pre-enroll"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <FormItemSelectStudentPreEnrollStatusStatus
        disabled={props.disabled}
        defaultValue={props.item?.status ?? undefined}
        required={true}
        width={"100%"}
      />

      <FormItemInputTextArea
        disabled={props.disabled}
        defaultValue={props.item?.statusFeedback ?? undefined}
        label={tWords("statusFeedback")}
        name="statusFeedback"
        rules={useDefaultFormRule({
          fielLabel: tWords("statusFeedback"),
          options: {
            required: false,
            max: 500,
          },
        })}
      />
    </CustomForm>
  );
}
