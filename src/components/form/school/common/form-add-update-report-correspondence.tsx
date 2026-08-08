"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import { ReportCorrespondenceRequest } from "@/lib/api/school/common/report/request";
import { ReportCorrespondenceResponse } from "@/lib/api/school/common/report/response";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useTranslations } from "next-intl";

export default function FormAddUpdateReportCorrespondence(
  props: CustomFormProps<
    ReportCorrespondenceRequest,
    ReportCorrespondenceResponse
  >
) {
  // React hooks
  const [form] = useForm<ReportCorrespondenceRequest>();
  const initialRequest: ReportCorrespondenceRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [, setRequest] = useState<ReportCorrespondenceRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ReportCorrespondenceRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ReportCorrespondenceRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      if (initialRequest?.schoolID) {
        newValues.schoolID = initialRequest.schoolID;
      }
      props.onSubmit(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-report-correspondence"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      {!initialRequest.schoolID ? (
        <FormItemSelectSchool
          disabled={props.disabled || (props.item?.school?.id ?? 0) > 0}
          defaultValue={props.item?.school?.id?.toString()}
          defaultOptions={props?.item?.school ? [props?.item?.school] : []}
          required={true}
          width={"100%"}
        />
      ) : undefined}
      <FormItemInputNumber
        disabled={props.disabled}
        name="minimum"
        label={tWords("minimum")}
        defaultValue={props.item?.minimum ?? undefined}
        min={-1}
        step={0.01}
        precision={2}
        width="100%"
        rules={[
          {
            required: true,
            message: tSentences("pleaseEnterValidLabel", {
              label: tWords("minimum"),
            }),
          },
        ]}
      />
      <FormItemInputNumber
        disabled={props.disabled}
        name="maximum"
        label={tWords("maximum")}
        defaultValue={props.item?.maximum ?? undefined}
        min={-1}
        step={0.01}
        precision={2}
        width="100%"
        rules={[
          {
            required: true,
            message: tSentences("pleaseEnterValidLabel", {
              label: tWords("maximum"),
            }),
          },
        ]}
      />
      <FormItemCheckbox
        disabled={props.disabled}
        name="includeMinimum"
        label={tWords("includeMinimum")}
        defaultValue={props.item?.includeMinimum ?? undefined}
        required={true}
      />
      <FormItemCheckbox
        disabled={props.disabled}
        name="includeMaximum"
        label={tWords("includeMaximum")}
        defaultValue={props.item?.includeMaximum ?? undefined}
        required={true}
      />
      <FormItemInputNumber
        disabled={props.disabled}
        name="newScore"
        label={tWords("newScore")}
        defaultValue={props.item?.newScore ?? undefined}
        min={-1}
        step={0.01}
        precision={2}
        width="100%"
        rules={[
          {
            required: true,
            message: tSentences("pleaseEnterValidLabel", {
              label: tWords("newScore"),
            }),
          },
        ]}
      />
    </CustomForm>
  );
}
