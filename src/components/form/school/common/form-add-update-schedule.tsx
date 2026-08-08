"use client";

import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import FormItemTime from "@/components/form-item/date/time";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemSelectScheduleDayOfTheWeek from "@/components/form-item/select/school/common/select-schedule-day-of-the-week";
import FormItemSelectScheduleRepeatType from "@/components/form-item/select/school/common/select-schedule-repeat-type";
import FormItemSelectScheduleType from "@/components/form-item/select/school/common/select-schedule-type";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import { SchoolConfig } from "@/config/school";
import { ScheduleRequest } from "@/lib/api/school/common/schedule/request";
import { ScheduleResponse } from "@/lib/api/school/common/schedule/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemSelect from "@/components/form-item/select/select";
import FormItemDateTime from "@/components/form-item/date/date-time";
import dayjs from "dayjs";
import { SCHEDULE_REPEAT_TYPE_WEEKLY } from "@/lib/constants/school/common/schedule";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateSchedule(
  props: CustomFormProps<ScheduleRequest, ScheduleResponse>
) {
  // React hooks
  const [form] = useForm<ScheduleRequest>();
  const initialRequest: ScheduleRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
    isCommon: false,
  };
  const [request, setRequest] = useState<ScheduleRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
    isCommon: initialRequest.isCommon ?? props.item?.isCommon,
  });

  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form");
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ScheduleRequest) => {
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
      newValues.unitID = undefined;
      form.setFieldValue("yearID", undefined);
      form.setFieldValue("classSubjectID", undefined);
      form.setFieldValue("unitID", undefined);
    }
    if (newValues.isCommon === true) {
      if (newValues.classSubjectID) {
        form.setFieldValue("classSubjectID", undefined);
      }
      if (newValues.unitID) {
        form.setFieldValue("unitID", undefined);
      }
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ScheduleRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      if (initialRequest?.schoolID) {
        newValues.schoolID = initialRequest.schoolID;
      }
      if (initialRequest?.yearID) {
        newValues.yearID = initialRequest.yearID;
      }
      newValues.schoolType = undefined;
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
      name={props.formName ?? "form-add-update-schedule"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      {!initialRequest.schoolID ? (
        <FormItemSelectSchool
          disabled={props.disabled}
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

      <FormItemCheckbox
        disabled={props.disabled}
        defaultValue={request?.isCommon ?? undefined}
        label={tWords("isCommon")}
        name="isCommon"
        tooltip={`tooltip.${tSentences("scheduleIsCommon")}`}
        required={false}
      />

      {request?.isCommon === true ? (
        <div></div>
      ) : request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
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
            max: 150,
          },
        })}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemSelectScheduleType
          disabled={props.disabled}
          defaultValue={props.item?.type ?? undefined}
          required={true}
          width={"100%"}
        />
        <FormItemSelectScheduleDayOfTheWeek
          disabled={props.disabled}
          defaultValue={props.item?.dayOfTheWeek ?? undefined}
          required={true}
          width={"100%"}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemSelectScheduleRepeatType
          disabled={props.disabled}
          defaultValue={props.item?.repeatType ?? SCHEDULE_REPEAT_TYPE_WEEKLY}
          required={true}
          width={"100%"}
        />
        <FormItemInputNumber
          disabled={props.disabled}
          defaultValue={props.item?.repeatCount ?? 1}
          label={tWords("repeatCount")}
          name="repeatCount"
          placeholder={tWords("repeatCount")}
          width="100%"
          rules={[
            {
              required: true,
              message: `validation.${tSentences("pleaseEnterValidLabel", {
                label: tWords("repeatCount"),
              })}`,
            },
          ]}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemTime
          disabled={props.disabled}
          defaultValue={props.item?.startTime ?? undefined}
          label={tWords("startTime")}
          name="startTime"
          required={true}
          width={"100%"}
        />
        <FormItemTime
          disabled={props.disabled}
          defaultValue={props.item?.endTime ?? undefined}
          label={tWords("endTime")}
          name="endTime"
          required={true}
          width={"100%"}
        />
      </div>
      <FormItemDateTime
        disabled={props.disabled}
        defaultValue={props.item?.startCountDate ?? dayjs()}
        label={tWords("startCountDate")}
        name="startCountDate"
        required={true}
        width={"100%"}
      />
      <FormItemCheckbox
        disabled={props.disabled}
        name="isValid"
        label={tWords("isValid")}
        defaultValue={props.item?.isValid ?? true}
        required={true}
      />
    </CustomForm>
  );
}
