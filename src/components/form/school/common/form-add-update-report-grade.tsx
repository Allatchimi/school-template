"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import { ReportGradeRequest } from "@/lib/api/school/common/report/request";
import { ReportGradeResponse } from "@/lib/api/school/common/report/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemInputText from "@/components/form-item/input/input-text";
import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemSelectReportGradeType from "@/components/form-item/select/school/common/select-report-grade-type";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateReportGrade(
  props: CustomFormProps<ReportGradeRequest, ReportGradeResponse>
) {
  // React hooks
  const [form] = useForm<ReportGradeRequest>();
  const initialRequest: ReportGradeRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [, setRequest] = useState<ReportGradeRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ReportGradeRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ReportGradeRequest) => {
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
      name={props.formName ?? "form-add-update-report-grade"}
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

      <FormItemSelectReportGradeType
        disabled={props.disabled}
        defaultValue={props.item?.type ?? undefined}
        required={true}
        width={"100%"}
      />

      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.name ?? undefined}
        label={tWords("name")}
        name="name"
        placeholder={tWords("name")}
        rules={useDefaultFormRule({
          fielLabel: tWords("name"),
          options: {
            required: true,
            max: 150,
          },
        })}
      />
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.description ?? undefined}
        label={tWords("description")}
        name="description"
        placeholder={tWords("description")}
        rules={useDefaultFormRule({
          fielLabel: tWords("description"),
          options: {
            required: false,
            max: 500,
          },
        })}
      />
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
    </CustomForm>
  );
}
