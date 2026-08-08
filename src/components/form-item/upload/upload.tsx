"use client";

import { ReactNode, useState } from "react";
import { castStringUrlToFile } from "@/helpers/cast/file";
import { UploadOutlined } from "@ant-design/icons";
import { Rule } from "antd/es/form";
import { UploadListType } from "antd/es/upload/interface";
import { UploadProps, UploadFile } from "antd";
import { Upload, Button } from "@/ui/antd";
import { useTranslations } from "next-intl";

export interface CustomUploadProps {
  disabled?: boolean;
  defaultValue?: string | string[];
  defaultValueFile?: UploadFile[];
  label?: string;
  name?: string | string[];
  uploadListType?: UploadListType;
  maxCount?: number;
  rules?: Rule[];
  placeholder?: string;
  multiple?: boolean;
  accept?: string;
  action?: string;
  extra?: ReactNode;
  imgWidth?: number;
  imgHeight?: number;
  imgQuality?: number;
  onChange?: (fileList: UploadFile[]) => void;
}

export default function CustomUpload(props: CustomUploadProps) {
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
    <Upload
      disabled={props.disabled}
      action={props.action}
      name="file"
      accept={props.accept}
      multiple={props.multiple}
      maxCount={props.maxCount}
      fileList={fileList}
      listType={props.uploadListType || "picture"}
      onChange={handleChange}
      openFileDialogOnClick={true}
    >
      <Button disabled={props.disabled} icon={<UploadOutlined />}>
        {tWords("upload")}
      </Button>
    </Upload>
  );
}

export function loadDefaultValue(a?: UploadFile[], b?: string | string[]) {
  return (a?.length ?? 0) > 0
    ? (a ?? [])
    : Array.isArray(b)
      ? (b
          ?.filter((item) => item && item.length > 0)
          ?.map((item, index) => castStringUrlToFile(item, index)) ?? [])
      : (b?.length ?? 0) > 0
        ? [castStringUrlToFile(b?.toString() ?? "")]
        : [];
}
