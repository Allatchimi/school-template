"use client";

import FormItemFormListDynamic from "@/components/form-item/form-list/form-list-dynamic";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormItemSelectYear from "@/components/form-item/select/school/common/select-year";
import FormItemSelectClassSubject from "@/components/form-item/select/school/highschool/select-class-subject";
import FormItemSelectUnit from "@/components/form-item/select/school/university/select-unit";
import FormItemUploadFile from "@/components/form-item/upload/upload-file";
import { SchoolConfig } from "@/config/school";
import { CourseRequest } from "@/lib/api/school/common/course/request";
import {
  CourseResponse,
  formatCourseDocumentListResponseToForm,
} from "@/lib/api/school/common/course/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useRef, useState } from "react";
import CustomForm, { CustomFormProps } from "../../form";
import { useForm } from "antd/es/form/Form";
import FormItemInputText from "@/components/form-item/input/input-text";
import { FormListFieldData, UploadFile } from "antd";
import FormItemSelect from "@/components/form-item/select/select";
import { FormItem } from "@/ui/antd";
import RichTextEditorSnow from "@/components/editor/rich-text-editor-snow";
import { RichTextEditorSnowHandle } from "@/components/editor/rich-text-editor-snow-internal";
import { useDefaultFormRule } from "@/hooks/use-form-rule";
import { useTranslations } from "next-intl";

export default function FormAddUpdateCourse(
  props: CustomFormProps<CourseRequest, CourseResponse>
) {
  // React hooks
  const [form] = useForm<CourseRequest>();
  const editorRef = useRef<RichTextEditorSnowHandle | null>(null);
  const initialRequest: CourseRequest = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
    yearID: SchoolConfig.yearID(),
  };
  const [request, setRequest] = useState<CourseRequest | undefined>({
    schoolID: initialRequest.schoolID ?? props.item?.school?.id,
    schoolType: initialRequest.schoolType ?? props.item?.school?.type,
    yearID: initialRequest.yearID ?? props.item?.year?.id,
  });

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values: CourseRequest) => {
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

    // Update & send event
    setRequest(newValues);
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: CourseRequest) => {
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
      name={props.formName ?? "form-add-update-course"}
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
        defaultValue={props.item?.title ?? undefined}
        label={tWords("title")}
        name="title"
        placeholder={tWords("title")}
        rules={useDefaultFormRule({
          fielLabel: tWords("title"),
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

      <FormItem name="content" label="Content">
        <RichTextEditorSnow
          ref={editorRef}
          props={{
            mounted: props.mounted,
            defaultValue: props.item?.content ?? undefined,
            onChange: (value) => {
              form.setFieldValue("content", value);
              const newValues = form.getFieldsValue();
              props.onValuesChange?.(newValues);
            },
          }}
        />
      </FormItem>

      <FormItemFormListDynamic<{
        title?: string | null;
        description?: string | null;
        url?: string | UploadFile[] | null;
      }>
        disabled={props.disabled}
        defaultValue={formatCourseDocumentListResponseToForm(
          props.item?.documents?.map((doc) => ({
            title: doc.title,
            description: doc.description,
            url: doc.url,
          })) ?? []
        )}
        name="documents"
        label={tWords("documents")}
        labelRow={tWords("document")}
        required={false}
        returnFormListRowTemplate={(field) => {
          return (
            <FormAddUpdateCourseDocument
              disabled={props.disabled}
              field={field}
            />
          );
        }}
      />

      <div className="w-full mt-4">
        <FormItemFormListDynamic<{
          title?: string | null;
          description?: string | null;
          url?: string | null;
        }>
          disabled={props.disabled}
          defaultValue={
            props.item?.videos?.map((video) => ({
              title: video.title,
              description: video.description,
              url: video.url,
            })) ?? undefined
          }
          name="videos"
          label={tWords("videosLinks")}
          labelRow={tWords("videoLink")}
          required={false}
          returnFormListRowTemplate={(field) => {
            return (
              <FormAddUpdateCourseVideo
                disabled={props.disabled}
                field={field}
              />
            );
          }}
        />
      </div>
    </CustomForm>
  );
}

function FormAddUpdateCourseDocument(props: {
  disabled?: boolean;
  field: FormListFieldData;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div key={props.field.key} className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          label={tWords("title")}
          name={[props.field.name.toString(), "title"]}
          placeholder={tWords("title")}
          rules={useDefaultFormRule({
            fielLabel: tWords("title"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          label={tWords("description")}
          name={[props.field.name.toString(), "description"]}
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

      <FormItemUploadFile
        disabled={props.disabled}
        label={tWords("url")}
        name={[props.field.name.toString(), "url"]}
        placeholder={tWords("url")}
        uploadListType="text"
        maxCount={1}
      />
    </div>
  );
}

function FormAddUpdateCourseVideo(props: {
  disabled?: boolean;
  field: FormListFieldData;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div key={props.field.key} className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItemInputText
          disabled={props.disabled}
          label={tWords("title")}
          name={[props.field.name.toString(), "title"]}
          placeholder={tWords("title")}
          rules={useDefaultFormRule({
            fielLabel: tWords("title"),
            options: {
              required: true,
              max: 150,
            },
          })}
        />

        <FormItemInputText
          disabled={props.disabled}
          label={tWords("description")}
          name={[props.field.name.toString(), "description"]}
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
      <FormItemInputText
        disabled={props.disabled}
        label={tWords("url")}
        name={[props.field.name.toString(), "url"]}
        placeholder={tWords("url")}
        rules={useDefaultFormRule({
          fielLabel: tWords("url"),
          options: {
            required: false,
            max: 1000,
          },
        })}
      />
    </div>
  );
}
