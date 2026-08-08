import { FormItem, Checkbox } from "@/ui/antd";
import { CheckboxChangeEvent } from "antd";
import { CSSProperties, ReactNode } from "react";

export interface FormItemCheckboxProps {
  disabled?: boolean;
  defaultValue?: boolean;
  label?: ReactNode;
  name?: string;
  tooltip?: string;
  required?: boolean;
  noStyle?: boolean;
  style?: CSSProperties;
  onChange?: (e: CheckboxChangeEvent) => void;
}

export default function FormItemCheckbox(props: FormItemCheckboxProps) {
  return (
    <FormItem
      initialValue={props.defaultValue}
      name={props.name}
      required={props.required}
      valuePropName="checked"
      noStyle={props.noStyle}
      tooltip={props.tooltip}
      style={{ ...props.style }}
    >
      <Checkbox disabled={props.disabled} onChange={props.onChange}>
        {props.label}
      </Checkbox>
    </FormItem>
  );
}
