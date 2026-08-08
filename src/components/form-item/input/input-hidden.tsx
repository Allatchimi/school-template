import { FormItem, Input } from "@/ui/antd";

export default function FormItemInputHidden(props: {
  name?: string | string[];
  defaultValue?: string;
}) {
  return (
    <FormItem name={props.name} initialValue={props.defaultValue} noStyle>
      <Input type="hidden" />
    </FormItem>
  );
}
