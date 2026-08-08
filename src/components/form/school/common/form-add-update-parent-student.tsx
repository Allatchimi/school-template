"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectStudent from "@/components/form-item/select/school/common/select-student";
import { SchoolConfig } from "@/config/school";
import { ParentStudentRequest } from "@/lib/api/school/common/parent/request";
import { ParentStudentResponse } from "@/lib/api/school/common/parent/response";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemSelectParent from "@/components/form-item/select/school/common/select-parent";

export default function FormAddUpdateParentStudent(
  props: CustomFormProps<ParentStudentRequest, ParentStudentResponse>
) {
  // React hooks
  const [form] = useForm<ParentStudentRequest>();
  const initialRequest: ParentStudentRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
  };
  const [request, setRequest] = useState<ParentStudentRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
  });

  const handleValuesChange = (values: ParentStudentRequest) => {
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
      newValues.parentID = undefined;
      newValues.studentID = undefined;
      form.setFieldValue("parentID", undefined);
      form.setFieldValue("studentID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ParentStudentRequest) => {
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
      name={props.formName ?? "form-add-update-^parent-student"}
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

      <FormItemSelectParent
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.parent?.id?.toString() ?? undefined}
        defaultOptions={props?.item?.parent ? [props?.item?.parent] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />

      <FormItemSelectStudent
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.student?.id?.toString() ?? undefined}
        defaultOptions={props?.item?.student ? [props?.item?.student] : []}
        request={{ schoolID: request?.schoolID }}
        required={true}
        width={"100%"}
      />
    </CustomForm>
  );
}
