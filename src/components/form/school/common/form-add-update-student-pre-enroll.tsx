"use client";

import FormItemInputTextArea from "@/components/form-item/input/input-text-area";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import FormItemSelect from "@/components/form-item/select/select";
import FormItemSelectGender from "@/components/form-item/select/user/select-gender";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { SchoolConfig } from "@/config/school";
import { StudentPreEnrollRequest } from "@/lib/api/school/common/student/request";
import {
  StudentEnrollResponse,
  StudentPreEnrollResponse,
} from "@/lib/api/school/common/student/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import FormItemInputText from "@/components/form-item/input/input-text";
import FormItemDate from "@/components/form-item/date/date";
import { useForm } from "antd/es/form/Form";
import FormItemSelectYearPreEnroll from "@/components/form-item/select/school/common/select-year-pre-enroll";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateStudentPreEnroll(
  props: CustomFormProps<StudentPreEnrollRequest, StudentEnrollResponse>
) {
  // React hooks
  const [form] = useForm<StudentPreEnrollRequest>();
  const initialRequest: StudentPreEnrollRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setRequest] = useState<StudentPreEnrollRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const session = useSession();
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: StudentPreEnrollRequest) => {
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
      newValues.classID = undefined;
      newValues.levelDomainID = undefined;
      form.setFieldValue("yearID", undefined);
      form.setFieldValue("classID", undefined);
      form.setFieldValue("levelDomainID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: StudentPreEnrollRequest) => {
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
      name={props.formName ?? "form-add-update-student-pre-enroll"}
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
        <FormItemSelectYearPreEnroll
          disabled={!request?.schoolID || props.disabled}
          defaultValue={props.item?.year?.id?.toString()}
          defaultOptions={props?.item?.year ? [props?.item?.year] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : undefined}

      {request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
        <FormItemSelectClass
          disabled={true}
          defaultValue={props.item?.class?.id?.toString()}
          defaultOptions={props?.item?.class ? [props?.item?.class] : []}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : request?.schoolType === SCHOOL_TYPE_UNIVERSITY ? (
        <FormItemSelectLevelDomain
          disabled={true}
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

      <FormAddUpdateStudentPreEnrollUserInfo
        disabled={props.disabled}
        item={{
          firstName: session.data?.user.firstName,
          lastName: session.data?.user.lastName,
        }}
      />
    </CustomForm>
  );
}

function FormAddUpdateStudentPreEnrollUserInfo(props: {
  disabled?: boolean;
  item?: StudentPreEnrollResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-full flex flex-col">
      <FormItemInputTextArea
        disabled={props.disabled}
        defaultValue={props.item?.message ?? undefined}
        label={tWords("message")}
        name={"message"}
        placeholder={tWords("message")}
        rules={useDefaultFormRule({
          fielLabel: tWords("message"),
          options: {
            required: true,
          },
        })}
      />

      <FormItemSelectGender
        disabled={props.disabled}
        defaultValue={props.item?.gender ?? undefined}
        required={true}
        width={"100%"}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.firstName ?? undefined}
          label={tWords("firstName")}
          name="firstName"
          placeholder={tWords("firstName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("firstName"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.lastName ?? undefined}
          label={tWords("lastName")}
          name="lastName"
          placeholder={tWords("lastName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("lastName"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.birthLocation ?? undefined}
          label={tWords("birthLocation")}
          name="birthLocation"
          placeholder={tWords("birthLocation")}
          rules={useDefaultFormRule({
            fielLabel: tWords("birthLocation"),
            options: {
              required: false,
              max: 150,
            },
          })}
        />
        <FormItemDate
          disabled={props.disabled}
          defaultValue={props.item?.birthday ?? undefined}
          label={tWords("birthday")}
          name="birthday"
          required={true}
        />
      </div>

      <FormItemUploadFile
        disabled={props.disabled}
        defaultValue={[
          props.item?.document1 ?? "",
          props.item?.document2 ?? "",
          props.item?.document3 ?? "",
          props.item?.document4 ?? "",
          props.item?.document5 ?? "",
        ]}
        label={tWords("document1")}
        name={"document1"}
        placeholder={tWords("document1")}
        uploadListType="text"
        maxCount={5}
      />
    </div>
  );
}
