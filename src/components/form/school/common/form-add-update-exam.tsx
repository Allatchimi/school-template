"use client";

import FormItemDateTime from "@/components/form-item/date/date-time";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectExamLocationType from "@/components/form-item/select/school/common/select-exam-location-type";
import FormItemSelectExamType from "@/components/form-item/select/school/common/select-exam-type";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import { SchoolConfig } from "@/config/school";
import { ExamRequest } from "@/lib/api/school/common/exam/request";
import { ExamResponse } from "@/lib/api/school/common/exam/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useForm } from "antd/es/form/Form";
import FormItemSelectSequence from "@/components/form-item/select/school/highschool/select-sequence";
import FormItemSelect from "@/components/form-item/select/select";
import FormItemSelectExamStatus from "@/components/form-item/select/school/common/select-exam-status";
import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateExam(
  props: CustomFormProps<ExamRequest, ExamResponse>
) {
  // React hooks
  const [form] = useForm<ExamRequest>();
  const initialRequest: ExamRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setRequest] = useState<ExamRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ExamRequest) => {
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

  const handleFinish = (values: ExamRequest) => {
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
      name={props.formName ?? "form-add-update-exam"}
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

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemSelectExamType
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.type?.id?.toString()}
          defaultOptions={props?.item?.type ? [props?.item?.type] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
        <FormItemSelectExamStatus
          disabled={props.disabled}
          defaultValue={props.item?.status ?? undefined}
          required={true}
          width={"100%"}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputNumber
          disabled={props.disabled}
          defaultValue={props.item?.notation ?? 20}
          label={tWords("notation")}
          name="notation"
          placeholder={tWords("notation")}
          min={1}
          step={0.01}
          precision={2}
          width="100%"
          rules={useDefaultFormRule({
            fielLabel: tWords("notation"),
            options: {
              required: true,
            },
          })}
        />
        <FormItemInputNumber
          disabled={props.disabled}
          defaultValue={props.item?.percentage ?? 100}
          label={tWords("percentage")}
          name="percentage"
          placeholder={tWords("percentage")}
          min={0}
          max={100}
          width="100%"
          rules={useDefaultFormRule({
            fielLabel: tWords("percentage"),
            options: {
              required: true,
            },
          })}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemSelectExamLocationType
          disabled={props.disabled}
          defaultValue={props.item?.locationType ?? undefined}
          required={true}
          width={"100%"}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.locationDetails ?? undefined}
          label={tWords("locationDetails")}
          name="locationDetails"
          placeholder={tWords("locationDetails")}
          rules={useDefaultFormRule({
            fielLabel: tWords("locationDetails"),
            options: {
              required: false,
              max: 150,
            },
          })}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.requirements ?? undefined}
          label={tWords("requirements")}
          name="requirements"
          rules={useDefaultFormRule({
            fielLabel: tWords("requirements"),
            options: {
              required: false,
              max: 500,
            },
          })}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.allowedItems ?? undefined}
          label={tWords("allowedItems")}
          name="allowedItems"
          rules={useDefaultFormRule({
            fielLabel: tWords("allowedItems"),
            options: {
              required: false,
              max: 500,
            },
          })}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemDateTime
          disabled={props.disabled}
          defaultValue={props.item?.startDate ?? undefined}
          label={tWords("startDate")}
          name="startDate"
          required={true}
          width={"100%"}
        />

        <FormItemDateTime
          disabled={props.disabled}
          defaultValue={props.item?.endDate ?? undefined}
          label={tWords("endDate")}
          name="endDate"
          required={true}
          width={"100%"}
        />
      </div>

      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={props.item?.isRetry ?? undefined}
        label={tWords("isRetry")}
        name="isRetry"
        required={true}
      />
    </CustomForm>
  );
}
