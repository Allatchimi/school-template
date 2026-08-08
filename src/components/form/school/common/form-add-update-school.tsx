"use client";

import FormItemInputEmail from "@/components/form-item/input/input-email";
import FormItemInputNumber from "@/components/form-item/input/input-number";
import FormItemInputPhone from "@/components/form-item/input/input-phone";
import FormItemInputText from "@/components/form-item/input/input-text";
import FormItemInputTextArea from "@/components/form-item/input/input-text-area";
import FormItemColorPicker from "@/components/form-item/picker/color-picker";
import FormItemSelectCurrency from "@/components/form-item/select/others/select-currency";
import FormItemSelectSchoolType from "@/components/form-item/select/school/common/select-school-type";
import FormItemUploadImage from "@/components/form-item/upload/upload-image";
import { SchoolRequest } from "@/lib/api/school/common/school/request";
import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { Divider } from "@/ui/antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { COLOR_SCHEME, COLOR_SCHEMES } from "@/lib/constants/others/color";
import FormItemSelectSchoolStatus from "@/components/form-item/select/school/common/select-school-status";
import {
  SCHOOL_CURRENCY_XAF,
  SCHOOL_STATUS_ENABLED,
} from "@/lib/constants/school/common/school";
import FormItemDate from "@/components/form-item/date/date";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { useTranslations } from "next-intl";
import { useDefaultFormRule } from "@/hooks/use-form-rule";

export default function FormAddUpdateSchool(
  props: CustomFormProps<SchoolRequest, SchoolResponse>
) {
  // React hooks
  const [form] = useForm<SchoolRequest>();
  const initialRequest: SchoolRequest = {};
  const [, setRequest] = useState<SchoolRequest | undefined>(initialRequest);
  const handleValuesChange = (values: SchoolRequest) => {
    const newValues = values;
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.tooltip");
  const tWords = useTranslations("Words");

  const handleFinish = (values: SchoolRequest) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };
  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-add-update-school"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <div className="w-full grid grid-cols-1">
        <FormItemUploadFile
          disabled={props.disabled}
          defaultValue={props.item?.favicon ?? ""}
          label={`${tWords("favicon")} (16x16)`}
          name="favicon"
          maxCount={1}
          accept="image/x-icon"
          onChange={(fileList) => {
            form.setFieldValue("favicon", fileList);
            handleValuesChange(form.getFieldsValue());
          }}
        />
        <FormItemUploadImage
          disabled={props.disabled}
          defaultValue={props.item?.logo ?? ""}
          label={`${tWords("logo")} (512x512)`}
          name="logo"
          imgWidth={512}
          imgHeight={512}
          imgQuality={100}
          maxCount={1}
          onChange={(fileList) => {
            form.setFieldValue("logo", fileList);
            handleValuesChange(form.getFieldsValue());
          }}
        />
        <FormItemUploadImage
          disabled={props.disabled}
          defaultValue={props.item?.logoWhite ?? ""}
          label={`${tWords("logoWhite")} (512x512)`}
          name="logoWhite"
          imgWidth={512}
          imgHeight={512}
          imgQuality={100}
          maxCount={1}
          onChange={(fileList) => {
            form.setFieldValue("logoWhite", fileList);
            handleValuesChange(form.getFieldsValue());
          }}
        />
      </div>

      <FormItemUploadImage
        disabled={props.disabled}
        defaultValue={[
          props.item?.info?.image1 ?? "",
          props.item?.info?.image2 ?? "",
          props.item?.info?.image3 ?? "",
          props.item?.info?.image4 ?? "",
          props.item?.info?.image5 ?? "",
        ]}
        label={`${tWords("showcaseImages")} (720x720, 5)`}
        name={["info", "image1"]}
        extra={tSentences("schoolShowcaseImages")}
        imgWidth={720}
        imgHeight={720}
        maxCount={5}
      />

      <div className="w-full grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.name ?? undefined}
          label={tWords("name")}
          name="name"
          placeholder={tWords("name")}
          tooltip={tSentences("schoolShortName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("name"),
            options: {
              required: true,
              min: 2,
              max: 150,
            },
          })}
        />
        <FormItemSelectSchoolType
          disabled={props.disabled}
          defaultValue={props.item?.type ?? undefined}
          required={true}
          width={"100%"}
        />
      </div>
      <FormItemSelectSchoolStatus
        disabled={props.disabled}
        defaultValue={props.item?.status || SCHOOL_STATUS_ENABLED}
        required={true}
        width={"100%"}
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemSelectCurrency
          disabled={props.disabled}
          defaultValue={props.item?.currency || SCHOOL_CURRENCY_XAF}
          required={true}
          width={"100%"}
        />
        <FormItemInputNumber
          disabled={props.disabled}
          defaultValue={props.item?.paymentCount ?? 1}
          label={tWords("paymentCount")}
          name="paymentCount"
          placeholder={tWords("paymentCount")}
          tooltip={tSentences("schoolPaymentCount")}
          min={1}
          max={10}
          width={"100%"}
          rules={[
            {
              required: true,
              message: tWords("paymentCount"),
            },
          ]}
        />
      </div>
      <Divider plain>{tWords("information")}</Divider>
      <FormAddUpdateSchoolInfo {...props} />

      <Divider plain>{tWords("configuration")}</Divider>
      <FormAddUpdateSchoolConfig {...props} />
    </CustomForm>
  );
}

function FormAddUpdateSchoolInfo(
  props: CustomFormProps<SchoolRequest, SchoolResponse>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.tooltip");
  const tWords = useTranslations("Words");

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.fullName ?? undefined}
          label={tWords("fullName")}
          name={["info", "fullName"]}
          placeholder={tWords("fullName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("fullName"),
            options: {
              required: true,
              max: 500,
            },
          })}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.description ?? undefined}
          label={tWords("description")}
          name={["info", "description"]}
          placeholder={tWords("description")}
          rules={useDefaultFormRule({
            fielLabel: tWords("description"),
            options: {
              required: false,
              max: 500,
            },
          })}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.founder ?? undefined}
          label={tWords("founder")}
          name={["info", "founder"]}
          tooltip={tSentences("schoolFounder")}
          placeholder={tWords("founder")}
          rules={useDefaultFormRule({
            fielLabel: tWords("founder"),
            options: {
              required: false,
              max: 150,
            },
          })}
        />
        <FormItemDate
          disabled={props.disabled}
          defaultValue={props.item?.info?.foundedAt ?? undefined}
          label={tWords("foundedAt")}
          name={["info", "foundedAt"]}
          width={"100%"}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.motto ?? undefined}
          label={tWords("motto")}
          tooltip={tSentences("schoolMotto")}
          name={["info", "motto"]}
          placeholder={tWords("motto")}
          rules={useDefaultFormRule({
            fielLabel: tWords("motto"),
            options: {
              required: false,
              max: 150,
            },
          })}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.address ?? undefined}
          label={tWords("address")}
          name={["info", "address"]}
          placeholder={tWords("address")}
          rules={useDefaultFormRule({
            fielLabel: tWords("address"),
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
          defaultValue={props.item?.info?.locationLongitude ?? undefined}
          label={tWords("locationLongitude")}
          name={["info", "locationLongitude"]}
          placeholder={tWords("locationLongitude")}
          tooltip={tSentences("schoolLocationLongitude")}
          rules={useDefaultFormRule({
            fielLabel: tWords("locationLongitude"),
            options: {
              required: false,
              max: 500,
            },
          })}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.locationLatitude ?? undefined}
          label={tWords("locationLatitude")}
          name={["info", "locationLatitude"]}
          placeholder={tWords("locationLatitude")}
          tooltip={tSentences("schoolLocationLatitude")}
          rules={useDefaultFormRule({
            fielLabel: tWords("locationLatitude"),
            options: {
              required: false,
              max: 500,
            },
          })}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.socialMediaYoutube ?? undefined}
          label={tWords("socialMediaYoutube")}
          name={["info", "socialMediaYoutube"]}
          placeholder={tWords("socialMediaYoutube")}
          tooltip={tSentences("schoolSocialMediaYoutube")}
          rules={useDefaultFormRule({
            fielLabel: tWords("socialMediaYoutube"),
            options: {
              required: false,
              max: 1000,
            },
          })}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.socialMediaTwitter ?? undefined}
          label={tWords("socialMediaTwitter")}
          name={["info", "socialMediaTwitter"]}
          placeholder={tWords("socialMediaTwitter")}
          tooltip={tSentences("schoolSocialMediaTwitter")}
          rules={useDefaultFormRule({
            fielLabel: tWords("socialMediaTwitter"),
            options: {
              required: false,
              max: 1000,
            },
          })}
        />
      </div>

      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.info?.socialMediaFacebook ?? undefined}
        label={tWords("socialMediaFacebook")}
        name={["info", "socialMediaFacebook"]}
        placeholder={tWords("socialMediaFacebook")}
        tooltip={tSentences("schoolSocialMediaFacebook")}
        rules={useDefaultFormRule({
          fielLabel: tWords("socialMediaFacebook"),
          options: {
            required: false,
            max: 1000,
          },
        })}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.socialMediaTelegram ?? undefined}
          label={tWords("socialMediaTelegram")}
          name={["info", "socialMediaTelegram"]}
          placeholder={tWords("socialMediaTelegram")}
          tooltip={tSentences("schoolSocialMediaTelegram")}
          rules={useDefaultFormRule({
            fielLabel: tWords("socialMediaTelegram"),
            options: {
              required: false,
              max: 1000,
            },
          })}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.info?.socialMediaWhasapp ?? undefined}
          label={tWords("socialMediaWhasapp")}
          name={["info", "socialMediaWhasapp"]}
          placeholder={tWords("socialMediaWhasapp")}
          tooltip={tSentences("schoolSocialMediaWhatsapp")}
          rules={useDefaultFormRule({
            fielLabel: tWords("socialMediaWhasapp"),
            options: {
              required: false,
              max: 1000,
            },
          })}
        />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FormItemInputEmail
          disabled={props.disabled}
          defaultValue={props.item?.info?.email1 ?? undefined}
          label={tWords("emailCount", { count: 1 })}
          name={["info", "email1"]}
        />
        <FormItemInputEmail
          disabled={props.disabled}
          defaultValue={props.item?.info?.email2 ?? undefined}
          label={tWords("emailCount", { count: 2 })}
          name={["info", "email2"]}
        />
        <FormItemInputEmail
          disabled={props.disabled}
          defaultValue={props.item?.info?.email3 ?? undefined}
          label={tWords("emailCount", { count: 3 })}
          name={["info", "email3"]}
        />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FormItemInputPhone
          disabled={props.disabled}
          defaultValue={props.item?.info?.phoneNumber1?.toString() ?? undefined}
          label={tWords("phoneNumberCount", { count: 1 })}
          name={["info", "phoneNumber1"]}
        />
        <FormItemInputPhone
          disabled={props.disabled}
          defaultValue={props.item?.info?.phoneNumber2?.toString() ?? undefined}
          label={tWords("phoneNumberCount", { count: 2 })}
          name={["info", "phoneNumber2"]}
        />
        <FormItemInputPhone
          disabled={props.disabled}
          defaultValue={props.item?.info?.phoneNumber3?.toString() ?? undefined}
          label={tWords("phoneNumberCount", { count: 3 })}
          name={["info", "phoneNumber3"]}
        />
      </div>
    </>
  );
}

function FormAddUpdateSchoolConfig(
  props: CustomFormProps<SchoolRequest, SchoolResponse>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.tooltip");
  const tWords = useTranslations("Words");

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.config?.websiteDomainName ?? undefined}
          label={tWords("websiteDomainName")}
          name={["config", "websiteDomainName"]}
          placeholder={tWords("websiteDomainName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("websiteDomainName"),
            options: {
              required: true,
              min: 2,
              max: 150,
            },
          })}
        />
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.config?.userEmailDomainName ?? undefined}
          label={tWords("userEmailDomainName")}
          name={["config", "userEmailDomainName"]}
          placeholder={tWords("userEmailDomainName")}
          rules={useDefaultFormRule({
            fielLabel: tWords("userEmailDomainName"),
            options: {
              required: true,
              min: 2,
              max: 150,
            },
          })}
        />
      </div>
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.config?.supportEmail ?? undefined}
        label={tWords("supportEmail")}
        name={["config", "supportEmail"]}
        placeholder={tWords("supportEmail")}
        rules={useDefaultFormRule({
          fielLabel: tWords("supportEmail"),
          options: {
            required: false,
            max: 150,
          },
        })}
      />
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={
          props.item?.config?.googleWorkspaceUserEmailDomain ?? undefined
        }
        label={tWords("googleWorkspaceUserEmailDomain")}
        name={["config", "googleWorkspaceUserEmailDomain"]}
        placeholder={tWords("googleWorkspaceUserEmailDomain")}
        rules={useDefaultFormRule({
          fielLabel: tWords("googleWorkspaceUserEmailDomain"),
          options: {
            required: false,
            max: 150,
          },
        })}
      />
      <FormItemInputTextArea
        disabled={props.disabled}
        defaultValue={
          props.item?.config?.googleWorkspaceCredentials ?? undefined
        }
        label={tWords("googleWorkspaceCredentials")}
        name={["config", "googleWorkspaceCredentials"]}
        placeholder={tWords("googleWorkspaceCredentials")}
        rules={useDefaultFormRule({
          fielLabel: tWords("googleWorkspaceCredentials"),
          options: {
            required: false,
            max: 1000,
          },
        })}
      />
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.config?.smsUserID ?? undefined}
        label={tWords("smsUserID")}
        name={["config", "smsUserID"]}
        placeholder={tWords("smsUserID")}
        tooltip={tSentences("schoolSmsUserID")}
        rules={useDefaultFormRule({
          fielLabel: tWords("smsUserID"),
          options: {
            required: false,
            max: 1000,
          },
        })}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.config?.whatsappToken ?? undefined}
          label={tWords("whatsappToken")}
          name={["config", "whatsappToken"]}
          placeholder={tWords("whatsappToken")}
          rules={useDefaultFormRule({
            fielLabel: tWords("whatsappToken"),
            options: {
              required: false,
              max: 1000,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.config?.whatsappPhoneID ?? undefined}
          label={tWords("whatsappPhoneID")}
          name={["config", "whatsappPhoneID"]}
          placeholder={tWords("whatsappPhoneID")}
          rules={useDefaultFormRule({
            fielLabel: tWords("whatsappPhoneID"),
            options: {
              required: false,
              max: 1000,
            },
          })}
        />
      </div>
      <FormItemInputText
        disabled={props.disabled}
        defaultValue={props.item?.config?.telegramBotToken ?? undefined}
        label={tWords("telegramBotToken")}
        name={["config", "telegramBotToken"]}
        placeholder={tWords("telegramBotToken")}
        rules={useDefaultFormRule({
          fielLabel: tWords("telegramBotToken"),
          options: {
            required: false,
            max: 1000,
          },
        })}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.config?.websiteTitle ?? undefined}
          label={tWords("websiteTitle")}
          name={["config", "websiteTitle"]}
          placeholder={tWords("websiteTitle")}
          rules={useDefaultFormRule({
            fielLabel: tWords("websiteTitle"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          defaultValue={props.item?.config?.websiteDescription ?? undefined}
          label={tWords("websiteDescription")}
          name={["config", "websiteDescription"]}
          placeholder={tWords("websiteDescription")}
          rules={useDefaultFormRule({
            fielLabel: tWords("websiteDescription"),
            options: {
              required: true,
              max: 500,
            },
          })}
        />
      </div>
      <div className="w-full flex flex-col">
        <FormItemColorPicker
          disabled={props.disabled}
          defaultValue={
            props.item?.config?.colorPrimary ?? COLOR_SCHEME.primary
          }
          label={tWords("colorPrimary")}
          name={["config", "colorPrimary"]}
          required={true}
          presets={COLOR_SCHEMES.map((item) => {
            return {
              key: item.primary,
              label: item.label,
              colors: [item.primary],
            };
          })}
        />
        <FormItemColorPicker
          disabled={props.disabled}
          defaultValue={
            props.item?.config?.colorPrimaryBg ?? COLOR_SCHEME.primaryBg
          }
          label={tWords("colorPrimaryBg")}
          name={["config", "colorPrimaryBg"]}
          required={true}
          presets={COLOR_SCHEMES.map((item) => {
            return {
              key: item.primaryBg,
              label: item.label,
              colors: [item.primaryBg],
            };
          })}
        />
        <FormItemColorPicker
          disabled={props.disabled}
          defaultValue={
            props.item?.config?.colorPrimaryBgHover ??
            COLOR_SCHEME.primaryBgHover
          }
          label={tWords("colorPrimaryBgHover")}
          name={["config", "colorPrimaryBgHover"]}
          required={true}
          presets={COLOR_SCHEMES.map((item) => {
            return {
              key: item.primaryBgHover,
              label: item.label,
              colors: [item.primaryBgHover],
            };
          })}
        />
      </div>
    </>
  );
}
