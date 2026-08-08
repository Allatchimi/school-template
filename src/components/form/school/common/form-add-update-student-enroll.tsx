"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import { SchoolConfig } from "@/config/school";
import { StudentEnrollRequest } from "@/lib/api/school/common/student/request";
import { StudentEnrollResponse } from "@/lib/api/school/common/student/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import FormItemSelect from "@/components/form-item/select/select";
import { useTranslations } from "next-intl";

export default function FormAddUpdateStudentEnroll(
  props: CustomFormProps<StudentEnrollRequest, StudentEnrollResponse>
) {
  // React hooks
  const [form] = useForm<StudentEnrollRequest>();
  const initialRequest: StudentEnrollRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setRequest] = useState<StudentEnrollRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: StudentEnrollRequest) => {
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
      newValues.studentID = undefined;
      newValues.classID = undefined;
      newValues.levelDomainID = undefined;
      form.setFieldValue("yearID", undefined);
      form.setFieldValue("studentID", undefined);
      form.setFieldValue("classID", undefined);
      form.setFieldValue("levelDomainID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: StudentEnrollRequest) => {
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
      name={props.formName ?? "form-add-update-student"}
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

      <FormItemSelectStudent
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.student?.id?.toString()}
        defaultOptions={props?.item?.student ? [props?.item?.student] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />

      {request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
        <FormItemSelectClass
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.class?.id?.toString()}
          defaultOptions={props?.item?.class ? [props?.item?.class] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : request?.schoolType === SCHOOL_TYPE_UNIVERSITY ? (
        <FormItemSelectLevelDomain
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.levelDomain?.id?.toString()}
          defaultOptions={
            props?.item?.levelDomain ? [props?.item?.levelDomain] : []
          }
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : (
        <FormItemSelect
          disabled={true}
          name="classLevelDomainID"
          label={tWords("classLevelDomain")}
          placeholder={tWords("classLevelDomain")}
          required={true}
          width={"100%"}
        />
      )}
    </CustomForm>
  );
}
