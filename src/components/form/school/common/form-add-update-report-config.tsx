"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import { ReportConfigRequest } from "@/lib/api/school/common/report/request";
import { ReportConfigResponse } from "@/lib/api/school/common/report/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import { useTranslations } from "next-intl";

export default function FormAddUpdateReportConfig(
  props: CustomFormProps<ReportConfigRequest, ReportConfigResponse>
) {
  // React hooks
  const [form] = useForm<ReportConfigRequest>();
  const initialRequest: ReportConfigRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [, setRequest] = useState<ReportConfigRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ReportConfigRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ReportConfigRequest) => {
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
      name={props.formName ?? "form-add-update-report-config"}
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
        defaultValue={props.item?.notationAverage ?? undefined}
        name="notationAverage"
        label={tWords("notationAverage")}
        placeholder={tWords("notationAverage")}
        min={1}
        step={0.01}
        precision={2}
        width="100%"
        rules={[
          {
            required: true,
            message: tSentences("pleaseEnterValidLabel", {
              label: tWords("notationAverage"),
            }),
          },
        ]}
      />
      <FormItemInputNumber
        disabled={props.disabled}
        defaultValue={props.item?.notationReport ?? undefined}
        name="notationReport"
        label={tWords("notationReport")}
        placeholder={tWords("notationReport")}
        min={1}
        step={0.01}
        precision={2}
        width="100%"
        rules={[
          {
            required: true,
            message: tSentences("pleaseEnterValidLabel", {
              label: tWords("notationReport"),
            }),
          },
        ]}
      />
      <FormItemInputNumber
        disabled={props.disabled}
        defaultValue={props.item?.minimumRequiredScoreToPromote ?? undefined}
        name="minimumRequiredScoreToPromote"
        label={tWords("minimumRequiredScoreToPromote")}
        placeholder={tWords("minimumRequiredScoreToPromote")}
        min={0}
        step={0.01}
        precision={2}
        width="100%"
        rules={[
          {
            required: true,
            message: tSentences("pleaseEnterValidLabel", {
              label: tWords("minimumRequiredScoreToPromote"),
            }),
          },
        ]}
      />
    </CustomForm>
  );
}
