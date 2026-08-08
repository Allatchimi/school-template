"use client";

import { SizeType } from "antd/es/config-provider/SizeContext";
import { FormItem, ColorPicker } from "@/ui/antd";
import { PresetsItem } from "antd/es/color-picker/interface";
import { useTranslations } from "next-intl";

interface FormItemColorPickerProps {
  name?: string | string[];
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
  presets?: PresetsItem[];
  required?: boolean;
  size?: SizeType;
  width?: string | number;
}

export default function FormItemColorPicker(props: FormItemColorPickerProps) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItem
      label={props.label}
      name={props.name}
      initialValue={props.defaultValue}
      rules={
        props.required === true
          ? [
              {
                required: true,
                message: tSentences("pleaseSelectTheLabel", {
                  label: tWords("color"),
                }),
              },
            ]
          : []
      }
      getValueFromEvent={(color) => {
        return "#" + color.toHex();
      }}
    >
      <ColorPicker
        disabled={props.disabled}
        size={props.size ?? "middle"}
        style={{ width: props.width }}
        mode={"single"}
        showText
        disabledAlpha
        allowClear
        presets={props.presets}
      />
    </FormItem>
  );
}
