import { Rule } from "antd/es/form";
import { FormItem, Rate } from "@/ui/antd";

export default function FormItemRate(props: {
  disabled?: boolean;
  defaultValue?: number;
  name?: string;
  label?: string;
  allowClear?: boolean;
  allowHalf?: boolean;
  maxCount?: number;
  rules?: Rule[];
  style?: React.CSSProperties;
}) {
  return (
    <FormItem
      label={props.label}
      name={props.name}
      initialValue={props.defaultValue}
      rules={props.rules ?? []}
      style={{ ...props.style }}
    >
      <Rate
        count={props.maxCount}
        disabled={props.disabled}
        allowHalf={props.allowHalf}
        allowClear={props.allowClear}
        defaultValue={props.defaultValue}
        character={({ index = 0 }) => index + 1}
      />
    </FormItem>
  );
}
