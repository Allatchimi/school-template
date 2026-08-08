import CustomUpload, { CustomUploadProps, loadDefaultValue } from "./upload";
import { PATH_CDN_URL_INTERNAL } from "@/lib/constants/routes";
import { FormItem } from "@/ui/antd";

export default function FormItemUploadFile(props: CustomUploadProps) {
  return (
    <FormItem
      label={props.label}
      name={props.name}
      initialValue={loadDefaultValue(
        props.defaultValueFile,
        props.defaultValue,
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
    >
      <CustomUpload
        {...props}
        action={`${PATH_CDN_URL_INTERNAL}/documents`}
        multiple={true}
      />
    </FormItem>
  );
}
