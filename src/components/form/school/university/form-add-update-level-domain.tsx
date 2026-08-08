"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectDomain from "@/components/form-item/select/school/university/select-domain";
import FormItemSelectLevel from "@/components/form-item/select/school/university/select-level";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { LevelDomainRequest } from "@/lib/api/school/university/level/request";
import { LevelDomainResponse } from "@/lib/api/school/university/level/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import {
  SCHOOL_CURRENCY_XAF,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateLevelDomain(
  props: CustomFormProps<LevelDomainRequest, LevelDomainResponse>
) {
  // React hooks
  const [form] = useForm<LevelDomainRequest>();
  const initialRequest: LevelDomainRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [request, setRequest] = useState<LevelDomainRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: LevelDomainRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.levelID = undefined;
      newValues.domainID = undefined;
      form.setFieldValue("levelID", undefined);
      form.setFieldValue("domainID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: LevelDomainRequest) => {
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
      name={props.formName ?? "form-add-update-level-domain"}
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
            type: SCHOOL_TYPE_UNIVERSITY,
          }}
          required={true}
          width={"100%"}
        />
      ) : undefined}

      <FormItemSelectLevel
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.level?.id?.toString()}
        defaultOptions={props?.item?.level ? [props?.item?.level] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />

      <FormItemSelectDomain
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.domain?.id?.toString()}
        defaultOptions={props?.item?.domain ? [props?.item?.domain] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />

      <FormItemInputNumber
        disabled={props.disabled}
        defaultValue={props.item?.fees ?? undefined}
        label={tWords("fees")}
        name="fees"
        placeholder={tWords("fees")}
        width="100%"
        min={0}
        step={0.01}
        precision={2}
        rules={useDefaultFormRule({
          fielLabel: tWords("fees"),
          options: {
            required: true,
          },
        })}
        suffix={` ${
          props.item?.school?.currency?.toUpperCase() ||
          SchoolConfig.schoolData()?.currency?.toUpperCase() ||
          SCHOOL_CURRENCY_XAF.toUpperCase()
        }`}
      />

      <FormItemUploadFile
        disabled={props.disabled}
        defaultValue={props.item?.program ?? undefined}
        label={tWords("program")}
        name="program"
        placeholder={tWords("program")}
        uploadListType="text"
        maxCount={1}
      />

      <FormItemUploadFile
        disabled={props.disabled}
        defaultValue={props.item?.requirements ?? undefined}
        label={tWords("requirements")}
        name="requirements"
        placeholder={tWords("requirements")}
        uploadListType="text"
        maxCount={1}
      />

      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={props.item?.isValid ?? true}
        label={tWords("isValid")}
        name="isValid"
      />
    </CustomForm>
  );
}
