"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectQuarter from "@/components/form-item/select/school/highschool/select-quarter";
import { SchoolConfig } from "@/config/school";
import { SequenceRequest } from "@/lib/api/school/highschool/sequence/request";
import { SequenceResponse } from "@/lib/api/school/highschool/sequence/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useForm } from "antd/es/form/Form";
import { SCHOOL_TYPE_HIGHSCHOOL } from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateSequence(
  props: CustomFormProps<SequenceRequest, SequenceResponse>
) {
  // React hooks
  const [form] = useForm<SequenceRequest>();
  const initialRequest: SequenceRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [request, setRequest] = useState<SequenceRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: SequenceRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.quarterID = undefined;
      form.setFieldValue("quarterID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: SequenceRequest) => {
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
      name={props.formName ?? "form-add-update-sequence"}
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
          request={{
            type: SCHOOL_TYPE_HIGHSCHOOL,
          }}
          required={true}
          width={"100%"}
        />
      ) : undefined}

      <FormItemSelectQuarter
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.quarter?.id?.toString()}
        defaultOptions={props?.item?.quarter ? [props?.item?.quarter] : []}
        request={{
          schoolID: request?.schoolID,
        }}
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
    </CustomForm>
  );
}
