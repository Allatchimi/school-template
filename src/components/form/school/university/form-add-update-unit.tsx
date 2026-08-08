"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import FormItemSelectSemester from "@/components/form-item/select/school/university/select-semester";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { SchoolConfig } from "@/config/school";
import { UnitRequest } from "@/lib/api/school/university/unit/request";
import { UnitResponse } from "@/lib/api/school/university/unit/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useForm } from "antd/es/form/Form";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateUnit(
  props: CustomFormProps<UnitRequest, UnitResponse>
) {
  // React hooks
  const [form] = useForm<UnitRequest>();
  const initialRequest: UnitRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [request, setRequest] = useState<UnitRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: UnitRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.levelDomainID = undefined;
      newValues.semesterID = undefined;
      form.setFieldValue("levelDomainID", undefined);
      form.setFieldValue("semesterID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: UnitRequest) => {
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
      name={props.formName ?? "form-add-update-unit"}
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

      <FormItemSelectLevelDomain
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.levelDomain?.id?.toString()}
        defaultOptions={
          props?.item?.levelDomain ? [props?.item?.levelDomain] : []
        }
        request={{
          schoolID: request?.schoolID,
        }}
        required={true}
        width={"100%"}
      />

      <FormItemSelectSemester
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.semester?.id?.toString()}
        defaultOptions={props?.item?.semester ? [props?.item?.semester] : []}
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

      <FormItemInputNumber
        disabled={props.disabled}
        defaultValue={props.item?.credit ?? undefined}
        label={tWords("credit")}
        name="credit"
        placeholder={tWords("credit")}
        width="100%"
        min={0}
        rules={useDefaultFormRule({
          fielLabel: tWords("credit"),
          options: {
            required: true,
            min: 0,
          },
        })}
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
