"use client";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { FormListFieldData } from "antd";
import { antdTheme, Text, FormList, FormItem, Button } from "@/ui/antd";
import { useTranslations } from "next-intl";

export interface FormItemFormListDynamicProps<T> {
  disabled?: boolean;
  defaultValue?: T[];
  label?: string;
  labelRow?: string;
  name?: string | string[];
  required?: boolean;
  returnFormListRowTemplate?: (
    field: FormListFieldData,
    index?: number
  ) => React.ReactNode;
}

export default function FormItemFormListDynamic<T>(
  props: FormItemFormListDynamicProps<T>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full flex flex-col gap-2">
      <Text ellipsis>{props.label}</Text>
      <FormList
        name={props.name ?? "list"}
        initialValue={props.defaultValue ?? []}
        rules={
          props.required
            ? [
                {
                  validator: (_, value) => {
                    if (!value || value.length < 1) {
                      return Promise.reject(
                        new Error(tSentences("pleaseEnterAtLeastOneItem"))
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]
            : undefined
        }
      >
        {(fields, { add, remove }) => (
          <div className="w-full flex flex-col gap-2">
            {fields.map((field, index) => (
              <div
                key={field.key}
                style={{
                  backgroundColor: theme.colorFillQuaternary,
                  borderRadius: theme.borderRadius,
                  borderWidth: "0.5px",
                  borderColor: theme.colorBorder,
                  borderStyle: "dashed",
                }}
                className="w-full flex flex-col gap-4 p-4"
              >
                <div className="w-full flex items-center justify-between gap-2">
                  <Text type="secondary" ellipsis>
                    {props.labelRow} {index + 1}
                  </Text>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </div>
                {props.returnFormListRowTemplate
                  ? props.returnFormListRowTemplate(field, index)
                  : undefined}
              </div>
            ))}
            <FormItem noStyle>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {tWords("add")} {props.labelRow}
              </Button>
            </FormItem>
          </div>
        )}
      </FormList>
    </div>
  );
}
