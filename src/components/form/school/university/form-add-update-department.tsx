"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectFaculty from "@/components/form-item/select/school/university/select-faculty";
import { SchoolConfig } from "@/config/school";
import { DepartmentRequest } from "@/lib/api/school/university/department/request";
import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { useForm } from "antd/es/form/Form";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateDepartment(
  props: CustomFormProps<DepartmentRequest, DepartmentResponse>
) {
  // React hooks
  const [form] = useForm<DepartmentRequest>();
  const initialRequest: DepartmentRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [request, setRequest] = useState<DepartmentRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: DepartmentRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.facultyID = undefined;
      form.setFieldValue("facultyID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: DepartmentRequest) => {
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
      name={props.formName ?? "form-add-update-department"}
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

      <FormItemSelectFaculty
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.faculty?.id?.toString()}
        defaultOptions={props?.item?.faculty ? [props?.item?.faculty] : []}
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
    </CustomForm>
  );
}
