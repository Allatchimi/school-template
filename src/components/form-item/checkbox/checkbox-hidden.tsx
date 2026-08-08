import { FormItem, Checkbox } from "@/ui/antd";

export interface FormItemCheckboxHiddenProps {
  name?: string;
  value?: boolean;
}

export default function FormItemCheckboxHidden(
  props: FormItemCheckboxHiddenProps,
) {
  return (
    <FormItem
      initialValue={props.value}
      name={props.name}
      valuePropName="checked"
      noStyle
    >
      <Checkbox style={{ display: "none" }} />
    </FormItem>
  );
}
