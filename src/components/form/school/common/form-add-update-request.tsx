"use client";

import FormItemInputTextArea from "@/components/form-item/input/input-text-area";
import FormItemSelectRequestAudience from "@/components/form-item/select/school/common/select-request-audience";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectSequence from "@/components/form-item/select/school/highschool/select-sequence";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { SchoolConfig } from "@/config/school";
import { RequestRequest } from "@/lib/api/school/common/request/request";
import { RequestResponse } from "@/lib/api/school/common/request/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { CustomFormProps } from "../../form";
import CustomForm from "../../form";
import FormItemSelect from "@/components/form-item/select/select";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateRequest(
  props: CustomFormProps<RequestRequest, RequestResponse>
) {
  // React hooks
  const [form] = useForm<RequestRequest>();
  const initialRequest: RequestRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setRequest] = useState<RequestRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: RequestRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    if (initialRequest?.schoolType) {
      newValues.schoolType = initialRequest.schoolType;
    } else if (request?.schoolType) {
      newValues.schoolType = request.schoolType;
    }
    if (initialRequest?.yearID) {
      newValues.yearID = initialRequest.yearID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.yearID = undefined;
      newValues.classSubjectID = undefined;
      newValues.sequenceID = undefined;
      newValues.unitID = undefined;
      form.setFieldValue("yearID", undefined);
      form.setFieldValue("classSubjectID", undefined);
      form.setFieldValue("sequenceID", undefined);
      form.setFieldValue("unitID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: RequestRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      if (initialRequest?.schoolID) {
        newValues.schoolID = initialRequest.schoolID;
      }
      if (initialRequest?.yearID) {
        newValues.yearID = initialRequest.yearID;
      }
      props.onSubmit(newValues);
    }
  };

  const updateSchoolType = (schoolType: string | null | undefined) => {
    const newValues = {
      ...form.getFieldsValue(),
      schoolType: schoolType,
    };
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-request"}
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
          onChangeFormatted={(value) => updateSchoolType(value?.type)}
          required={true}
          width={"100%"}
        />
      ) : undefined}
      {!initialRequest.yearID ? (
        <FormItemSelectYear
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.year?.id?.toString()}
          defaultOptions={props?.item?.year ? [props?.item?.year] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : undefined}

      {request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
        <div>
          <FormItemSelectClassSubject
            disabled={!request?.schoolID || props.disabled}
            defaultValue={props.item?.classSubject?.id?.toString()}
            defaultOptions={
              props?.item?.classSubject ? [props?.item?.classSubject] : []
            }
            request={{ schoolID: request?.schoolID }}
            required={true}
            width={"100%"}
          />
          <FormItemSelectSequence
            disabled={!request?.schoolID || props.disabled}
            defaultValue={props.item?.sequence?.id?.toString()}
            defaultOptions={
              props?.item?.sequence ? [props?.item?.sequence] : []
            }
            request={{ schoolID: request?.schoolID }}
            required={true}
            width={"100%"}
          />
        </div>
      ) : request?.schoolType === SCHOOL_TYPE_UNIVERSITY ? (
        <FormItemSelectUnit
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.unit?.id?.toString()}
          defaultOptions={props?.item?.unit ? [props?.item?.unit] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : (
        <FormItemSelect
          disabled={true}
          name="classSubjectUnitID"
          label={tWords("subjectUnit")}
          placeholder={tWords("subjectUnit")}
          required={true}
          width={"100%"}
        />
      )}

      <FormItemSelectRequestAudience
        disabled={props.disabled}
        defaultValue={props.item?.audience ?? undefined}
        required={true}
        width={"100%"}
      />
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.title ?? undefined}
        label={tWords("title")}
        name="title"
        placeholder={tWords("title")}
        rules={useDefaultFormRule({
          fielLabel: tWords("title"),
          options: {
            required: true,
            min: 2,
            max: 150,
          },
        })}
      />
      <FormItemInputTextArea
        disabled={props.disabled}
        defaultValue={props.item?.message ?? undefined}
        label={tWords("message")}
        name="message"
        rules={useDefaultFormRule({
          fielLabel: tWords("message"),
          options: {
            required: true,
          },
        })}
      />
      <FormItemUploadFile
        disabled={props.disabled}
        defaultValue={[
          props.item?.document1 ?? "",
          props.item?.document2 ?? "",
          props.item?.document3 ?? "",
          props.item?.document4 ?? "",
          props.item?.document5 ?? "",
        ]}
        label={tWords("documents")}
        name={"document1"}
        placeholder={tWords("documents")}
        uploadListType="text"
        maxCount={5}
      />
    </CustomForm>
  );
}
