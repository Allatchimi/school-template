"use client";

import { useState } from "react";
import { CustomUploadProps, loadDefaultValue } from "./upload";
import ImgCrop from "antd-img-crop";
import { PATH_CDN_URL_INTERNAL } from "@/lib/constants/routes";
import { PlusOutlined } from "@ant-design/icons";
import { UploadProps, UploadFile } from "antd";
import { FormItem, Text, Upload } from "@/ui/antd";
import { useTranslations } from "next-intl";

import "../../../styles/form.css";

export default function FormItemUploadImageCrop(props: CustomUploadProps) {
  // React hooks
  const [fileList, setFileList] = useState<UploadFile[]>(
    loadDefaultValue(props.defaultValueFile, props.defaultValue) ?? []
  );

  // Next hooks
  const tWords = useTranslations("Words");

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    props.onChange?.(newFileList);
  };

  return (
    <div className="space-y-1 mb-4">
      <div className="w-full flex flex-col gap-2">
        <Text ellipsis>{props.label}</Text>
        <ImgCrop rotationSlider fillColor="transparent">
          <Upload
            disabled={props.disabled}
            name="file"
            maxCount={props.maxCount}
            fileList={fileList}
            onChange={handleChange}
            openFileDialogOnClick={true}
            action={`${PATH_CDN_URL_INTERNAL}/images?w=${
              props.imgWidth || 512
            }&h=${props.imgHeight || 512}&q=${props.imgQuality ?? 75}`}
            multiple={true}
            accept={props.accept || "image/*"}
            listType="picture-card"
          >
            {fileList.length < (props.maxCount ?? 1) && (
              <button
                style={{
                  border: "0px",
                  background: "none",
                  cursor: "pointer",
                }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{tWords("upload")}</div>
              </button>
            )}
          </Upload>
        </ImgCrop>
      </div>
      <FormItem
        name={props.name}
        initialValue={loadDefaultValue(
          props.defaultValueFile,
          props.defaultValue
        )}
        valuePropName="fileList"
        getValueFromEvent={(eventValue) => {
          if (Array.isArray(eventValue)) {
            return eventValue;
          }
          return eventValue && eventValue.fileList;
        }}
        rules={props.rules}
        extra={props.extra}
        style={{
          margin: "0px",
        }}
        className="custom-form-item-hidden"
      />
    </div>
  );
}
