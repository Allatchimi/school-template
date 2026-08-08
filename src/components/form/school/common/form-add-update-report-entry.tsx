"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import { SchoolConfig } from "@/config/school";
import { ReportEntryRequest } from "@/lib/api/school/common/report/request";
import { ReportEntryResponse } from "@/lib/api/school/common/report/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelect from "@/components/form-item/select/select";
import FormItemSelectReportEntryPeriodType from "@/components/form-item/select/school/common/select-report-entry-period-type";
import {
  REPORT_ENTRY_PERIOD_TYPE_FINAL,
  REPORT_ENTRY_PERIOD_TYPE_QUARTER,
  REPORT_ENTRY_PERIOD_TYPE_SEQUENCE,
} from "@/lib/constants/school/common/report";
import FormItemSelectSemester from "@/components/form-item/select/school/university/select-semester";
import FormItemSelectQuarter from "@/components/form-item/select/school/highschool/select-quarter";
import FormItemSelectSequence from "@/components/form-item/select/school/highschool/select-sequence";
import { useTranslations } from "next-intl";

export default function FormAddUpdateReportEntry(
  props: CustomFormProps<ReportEntryRequest, ReportEntryResponse>
) {
  // React hooks
  const [form] = useForm<ReportEntryRequest>();
  const initialRequest: ReportEntryRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setRequest] = useState<ReportEntryRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: ReportEntryRequest) => {
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
      newValues.periodType = undefined;
      newValues.quarterID = undefined;
      newValues.sequenceID = undefined;
      newValues.semesterID = undefined;
      form.setFieldValue("yearID", undefined);
      form.setFieldValue("classID", undefined);
      form.setFieldValue("levelDomainID", undefined);
      form.setFieldValue("periodType", undefined);
      form.setFieldValue("quarterID", undefined);
      form.setFieldValue("sequenceID", undefined);
      form.setFieldValue("semesterID", undefined);
    }
    if (request?.periodType != newValues.periodType) {
      newValues.quarterID = undefined;
      newValues.sequenceID = undefined;
      newValues.semesterID = undefined;
      form.setFieldValue("quarterID", undefined);
      form.setFieldValue("sequenceID", undefined);
      form.setFieldValue("semesterID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: ReportEntryRequest) => {
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
      name={props.formName ?? "form-add-update-report"}
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
        <FormItemSelectClass
          disabled={!request?.schoolID || props.disabled}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : request?.schoolType === SCHOOL_TYPE_UNIVERSITY ? (
        <FormItemSelectLevelDomain
          disabled={!request?.schoolID || props.disabled}
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

      <FormItemSelectReportEntryPeriodType
        disabled={!request?.schoolID || props.disabled}
        request={{
          schoolType: request?.schoolType ?? undefined,
        }}
        required={true}
        width={"100%"}
      />

      {request?.periodType === REPORT_ENTRY_PERIOD_TYPE_FINAL ? (
        <div></div>
      ) : request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
        request?.periodType === REPORT_ENTRY_PERIOD_TYPE_QUARTER ? (
          <FormItemSelectQuarter
            disabled={!request?.schoolID || props.disabled}
            request={{ schoolID: request?.schoolID }}
            required={true}
            width={"100%"}
          />
        ) : request?.periodType === REPORT_ENTRY_PERIOD_TYPE_SEQUENCE ? (
          <FormItemSelectSequence
            disabled={!request?.schoolID || props.disabled}
            request={{ schoolID: request?.schoolID }}
            required={true}
            width={"100%"}
          />
        ) : (
          <FormItemSelect
            disabled={true}
            name="periodValue"
            label={tWords("periodValue")}
            placeholder={tWords("periodValue")}
            required={true}
            width={"100%"}
          />
        )
      ) : request?.schoolType === SCHOOL_TYPE_UNIVERSITY ? (
        <FormItemSelectSemester
          disabled={!request?.schoolID || props.disabled}
          request={{ schoolID: request?.schoolID }}
          required={true}
          width={"100%"}
        />
      ) : (
        <FormItemSelect
          disabled={true}
          name="periodValue"
          label={tWords("periodValue")}
          placeholder={tWords("periodValue")}
          required={true}
          width={"100%"}
        />
      )}
    </CustomForm>
  );
}
