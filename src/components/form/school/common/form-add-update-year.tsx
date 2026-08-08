"use client";

import FormItemDate from "@/components/form-item/date/date";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import { YearRequest } from "@/lib/api/school/common/year/request";
import { YearResponse } from "@/lib/api/school/common/year/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import { useTranslations } from "next-intl";

export default function FormAddUpdateYear(
  props: CustomFormProps<YearRequest, YearResponse>
) {
  // React hooks
  const [form] = useForm<YearRequest>();
  const initialRequest: YearRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [, setRequest] = useState<YearRequest | undefined>(initialRequest);

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: YearRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: YearRequest) => {
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
      name={props.formName ?? "form-add-update-year"}
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
          required={true}
          width={"100%"}
        />
      ) : undefined}
      <FormItemDate
        disabled={props.disabled}
        defaultValue={props.item?.startDate ?? undefined}
        label={tWords("startDate")}
        name="startDate"
        required={true}
        width={"100%"}
      />
      <FormItemDate
        disabled={props.disabled}
        defaultValue={props.item?.endDate ?? undefined}
        label={tWords("endDate")}
        name="endDate"
        required={true}
        width={"100%"}
      />
    </CustomForm>
  );
}
