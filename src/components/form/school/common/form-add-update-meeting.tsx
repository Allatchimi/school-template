"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormItemSelect from "@/components/form-item/select/select";
import { SchoolConfig } from "@/config/school";
import { MeetingRequest } from "@/lib/api/school/common/meeting/request";
import { MeetingResponse } from "@/lib/api/school/common/meeting/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useTranslations } from "next-intl";

export default function FormAddUpdateMeeting(
  props: CustomFormProps<MeetingRequest, MeetingResponse>
) {
  // React hooks
  const [form] = useForm<MeetingRequest>();
  const initialRequest: MeetingRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
  };
  const [request, setRequest] = useState<MeetingRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: MeetingRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }
    if (initialRequest?.schoolType) {
      newValues.schoolType = initialRequest.schoolType;
    } else if (request?.schoolType) {
      newValues.schoolType = request.schoolType;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.classSubjectID = undefined;
      newValues.unitID = undefined;
      form.setFieldValue("classSubjectID", undefined);
      form.setFieldValue("unitID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: MeetingRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      if (initialRequest?.schoolID) {
        newValues.schoolID = initialRequest.schoolID;
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
      name={props.formName ?? "form-add-update-meeting"}
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
          onChangeFormatted={(value) => updateSchoolType(value?.type)}
          required={true}
          width={"100%"}
        />
      ) : undefined}
      {request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
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
    </CustomForm>
  );
}
