"use client";

import FormItemDateTime from "@/components/form-item/date/date-time";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemInputTextArea from "@/components/form-item/input/input-text-area";
import FormItemSelectCurrency from "@/components/form-item/select/others/select-currency";
import FormItemSelectPaymentMethod from "@/components/form-item/select/school/common/select-payment-method";
import FormItemSelectPaymentStatus from "@/components/form-item/select/school/common/select-payment-status";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectStudentEnroll from "@/components/form-item/select/school/common/select-student-enroll";
import { SchoolConfig } from "@/config/school";
import { PaymentEnrollRequest } from "@/lib/api/school/common/payment/request";
import { PaymentEnrollResponse } from "@/lib/api/school/common/payment/response";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import {
  PAYMENT_METHOD_CASH,
  PAYMENT_STATUS_SUCCESS,
} from "@/lib/constants/school/common/payment";
import { SCHOOL_CURRENCY_XAF } from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdatePayment(
  props: CustomFormProps<PaymentEnrollRequest, PaymentEnrollResponse>
) {
  // React hooks
  const [form] = useForm<PaymentEnrollRequest>();
  const initialRequest: PaymentEnrollRequest = {
    schoolID: SchoolConfig.schoolID(),
  };
  const [request, setRequest] = useState<PaymentEnrollRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: PaymentEnrollRequest) => {
    const newValues = values;
    if (initialRequest?.schoolID) {
      newValues.schoolID = initialRequest.schoolID;
    }

    // Cleanup values
    if (request?.schoolID != newValues.schoolID) {
      newValues.studentEnrollID = undefined;
      form.setFieldValue("studentEnrollID", undefined);
    }

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: PaymentEnrollRequest) => {
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
      name={props.formName ?? "form-add-update-payment"}
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
          required={true}
          width={"100%"}
        />
      ) : undefined}

      <FormItemSelectStudentEnroll
        disabled={!request?.schoolID || props.disabled}
        defaultValue={props.item?.studentEnroll?.id?.toString()}
        defaultOptions={
          props?.item?.studentEnroll ? [props?.item?.studentEnroll] : []
        }
        request={{
          schoolID: request?.schoolID,
        }}
        required={true}
        width={"100%"}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputNumber
          disabled={props.disabled}
          defaultValue={props.item?.amount ?? 0}
          label={tWords("amount")}
          name="amount"
          placeholder={tWords("amount")}
          min={0}
          width={"100%"}
          rules={useDefaultFormRule({
            fielLabel: tWords("amount"),
            options: {
              required: true,
            },
          })}
        />
        <FormItemSelectCurrency
          disabled={props.disabled}
          defaultValue={
            props.item?.currency ||
            SchoolConfig.schoolData()?.currency ||
            SCHOOL_CURRENCY_XAF
          }
          required={true}
          width={"100%"}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemDateTime
          disabled={props.disabled}
          defaultValue={props.item?.date ?? undefined}
          label={tWords("date")}
          name="date"
          width={"100%"}
        />
        <FormItemSelectPaymentMethod
          disabled={props.disabled}
          defaultValue={props.item?.method ?? PAYMENT_METHOD_CASH}
          required={true}
          width={"100%"}
        />
      </div>

      <FormItemSelectPaymentStatus
        disabled={props.disabled}
        defaultValue={props.item?.status ?? PAYMENT_STATUS_SUCCESS}
        required={true}
        width={"100%"}
      />

      <FormItemInputTextArea
        disabled={props.disabled}
        defaultValue={props.item?.message ?? undefined}
        label={tWords("message")}
        name="message"
        placeholder={tWords("message")}
        rules={useDefaultFormRule({
          fielLabel: tWords("message"),
          options: {
            required: false,
          },
        })}
      />
    </CustomForm>
  );
}
