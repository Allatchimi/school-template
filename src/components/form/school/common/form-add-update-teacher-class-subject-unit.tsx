"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormItemSelect from "@/components/form-item/select/select";
import { SchoolConfig } from "@/config/school";
import { TeacherClassSubjectUnitResponse } from "@/lib/api/school/common/teacher/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { TeacherClassSubjectUnitRequest } from "@/lib/api/school/common/teacher/request";
import FormItemSelectTeacher from "@/components/form-item/select/school/common/select-teacher";
import { useTranslations } from "next-intl";

export default function FormAddUpdateTeacherClassSubjectUnit(
  props: CustomFormProps<
    TeacherClassSubjectUnitRequest,
    TeacherClassSubjectUnitResponse
  >
) {
  // React hooks
  const [form] = useForm<TeacherClassSubjectUnitRequest>();
  const initialTeacherClassSubjectUnit: TeacherClassSubjectUnitRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setTeacherClassSubjectUnit] = useState<
    TeacherClassSubjectUnitRequest | undefined
  >({
    schoolID: initialTeacherClassSubjectUnit.schoolID ?? props.item?.school?.id,
    schoolType:
      initialTeacherClassSubjectUnit.schoolType ?? props.item?.school?.type,
    yearID: initialTeacherClassSubjectUnit.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: TeacherClassSubjectUnitRequest) => {
    const newValues = values;
    if (initialTeacherClassSubjectUnit?.schoolID) {
      newValues.schoolID = initialTeacherClassSubjectUnit.schoolID;
    }
    if (initialTeacherClassSubjectUnit?.schoolType) {
      newValues.schoolType = initialTeacherClassSubjectUnit.schoolType;
    } else if (request?.schoolType) {
      newValues.schoolType = request.schoolType;
    }
    if (initialTeacherClassSubjectUnit?.yearID) {
      newValues.yearID = initialTeacherClassSubjectUnit.yearID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.yearID = undefined;
      newValues.classSubjectID = undefined;
      newValues.unitID = undefined;
      newValues.teacherID = undefined;
      form.setFieldValue("yearID", undefined);
      form.setFieldValue("classSubjectID", undefined);
      form.setFieldValue("unitID", undefined);
      form.setFieldValue("teacherID", undefined);
    }

    // Update & send event
    setTeacherClassSubjectUnit(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: TeacherClassSubjectUnitRequest) => {
    if (props.onSubmit) {
      const newValues = values;
      if (initialTeacherClassSubjectUnit?.schoolID) {
        newValues.schoolID = initialTeacherClassSubjectUnit.schoolID;
      }
      if (initialTeacherClassSubjectUnit?.yearID) {
        newValues.yearID = initialTeacherClassSubjectUnit.yearID;
      }
      props.onSubmit(newValues);
    }
  };

  const updateSchoolType = (schoolType: string | null | undefined) => {
    const newValues = {
      ...form.getFieldsValue(),
      schoolType: schoolType,
    };
    setTeacherClassSubjectUnit(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-teacher-class-subject-unit"}
      layout={"vertical"}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      {!initialTeacherClassSubjectUnit.schoolID ? (
        <FormItemSelectSchool
          disabled={props.disabled || (props.item?.school?.id ?? 0) > 0}
          defaultValue={props.item?.school?.id?.toString()}
          defaultOptions={props?.item?.school ? [props?.item?.school] : []}
          onChangeFormatted={(value) => updateSchoolType(value?.type)}
          required={true}
          width={"100%"}
        />
      ) : undefined}
      {!initialTeacherClassSubjectUnit.yearID ? (
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

      <FormItemSelectTeacher
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.teacher?.id?.toString() ?? undefined}
        defaultOptions={props?.item?.teacher ? [props?.item?.teacher] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />
    </CustomForm>
  );
}
