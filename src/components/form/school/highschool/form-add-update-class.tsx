"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectSpecialty from "@/components/form-item/select/school/highschool/select-specialty";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { SchoolConfig } from "@/config/school";
import { ClassRequest } from "@/lib/api/school/highschool/class/request";
import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useForm } from "antd/es/form/Form";
import {
  SCHOOL_CURRENCY_XAF,
  SCHOOL_TYPE_HIGHSCHOOL,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateClass(
  props: CustomFormProps<ClassRequest, ClassResponse>
) {
  // React hooks
  const [form] = useForm<ClassRequest>();
  const initialRequest: ClassRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [request, setRequest] = useState<ClassRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ClassRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.specialtyID = undefined;
      form.setFieldValue("specialtyID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ClassRequest) => {
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
      name={props.formName ?? "form-add-update-class"}
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

      <FormItemSelectSpecialty
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.specialty?.id?.toString()}
        defaultOptions={props?.item?.specialty ? [props?.item?.specialty] : []}
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
        defaultValue={props.item?.fees ?? undefined}
        label={tWords("fees")}
        name="fees"
        placeholder={tWords("fees")}
        min={0}
        step={0.01}
        precision={2}
        width="100%"
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
