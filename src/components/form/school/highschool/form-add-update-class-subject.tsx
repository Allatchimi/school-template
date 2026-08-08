"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectSubject from "@/components/form-item/select/school/highschool/select-subject";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { ClassSubjectRequest } from "@/lib/api/school/highschool/class/request";
import { ClassSubjectResponse } from "@/lib/api/school/highschool/class/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import { SchoolConfig } from "@/config/school";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SCHOOL_TYPE_HIGHSCHOOL } from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateClassSubject(
  props: CustomFormProps<ClassSubjectRequest, ClassSubjectResponse>
) {
  // React hooks
  const [form] = useForm<ClassSubjectRequest>();
  const initialRequest: ClassSubjectRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [request, setRequest] = useState<ClassSubjectRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ClassSubjectRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.classID = undefined;
      newValues.subjectID = undefined;
      form.setFieldValue("classID", undefined);
      form.setFieldValue("subjectID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ClassSubjectRequest) => {
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

      <FormItemSelectClass
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.class?.id?.toString()}
        defaultOptions={props?.item?.class ? [props?.item?.class] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />

      <FormItemSelectSubject
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.subject?.id?.toString()}
        defaultOptions={props?.item?.subject ? [props?.item?.subject] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />

      <FormItemInputNumber
        disabled={props.disabled}
        defaultValue={props.item?.coefficient ?? undefined}
        label={tWords("coefficient")}
        name="coefficient"
        placeholder={tWords("coefficient")}
        width="100%"
        min={0}
        rules={useDefaultFormRule({
          fielLabel: tWords("coefficient"),
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
