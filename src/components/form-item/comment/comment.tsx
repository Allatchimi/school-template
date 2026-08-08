"use client";

import { CSSProperties } from "react";
import { FormInstance } from "antd";
import { Form, FormItem, Button, InputTextArea } from "@/ui/antd";
import { SyncOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface Message {
  message?: string;
}

export interface FormCommentProps {
  disabled?: boolean;
  loading?: boolean;
  fetching?: boolean;
  form?: FormInstance<Message>;
  style?: CSSProperties;
  onValuesChange?: (value: Message) => void;
  onSubmit?: (value: Message) => void;
  onRefresh?: () => void;
}

export default function FormComment(props: FormCommentProps) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <Form<Message>
      form={props.form}
      onFinish={(values) => {
        if ((values.message?.length ?? 0) > 0 && props.onSubmit) {
          props.onSubmit(values);
        }
      }}
      disabled={props.disabled}
      onValuesChange={(_changedValues, values) => {
        if (props.onValuesChange) {
          props.onValuesChange(values);
        }
      }}
      style={props.style}
    >
      <FormItem
        name={"message"}
        style={{
          marginBottom: "10px",
        }}
      >
        <InputTextArea rows={8} />
      </FormItem>
      <div className="w-full flex flex-wrap items-center justify-between gap-4">
        <FormItem noStyle>
          <Button
            type="primary"
            htmlType="submit"
            disabled={props.disabled}
            loading={props.loading || props.fetching}
          >
            {tWords("add")}
          </Button>
        </FormItem>
        <Button
          disabled={props.disabled}
          loading={props.loading || props.fetching}
          icon={<SyncOutlined />}
          onClick={props.onRefresh}
        >
          {tWords("refresh")}
        </Button>
      </div>
    </Form>
  );
}
