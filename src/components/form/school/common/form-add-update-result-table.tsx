"use client";

import FormItemSelectExam from "@/components/form-item/select/school/common/select-exam";
import { SchoolConfig } from "@/config/school";
import { ResultTableRequest } from "@/lib/api/school/common/result/request";
import { ResultTableResponse } from "@/lib/api/school/common/result/response";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { CustomFormProps } from "../../form";
import CustomForm from "../../form";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectResultStatus from "@/components/form-item/select/school/common/select-result-status";

export default function FormAddUpdateResultTable(
  props: CustomFormProps<ResultTableRequest, ResultTableResponse>
) {
  // React hooks
  const [form] = useForm<ResultTableRequest>();
  const initialRequest: ResultTableRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
  };
  const [request, setRequest] = useState<ResultTableRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
  });

  const handleValuesChange = (values: ResultTableRequest) => {
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
      form.setFieldValue("examID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ResultTableRequest) => {
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
      name={props.formName ?? "form-add-update-result-table"}
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
      />
      <FormItemSelectResultStatus
        disabled={props.disabled}
        defaultValue={props.item?.status ?? undefined}
        required={true}
        width={"100%"}
      />
    </CustomForm>
  );
}
