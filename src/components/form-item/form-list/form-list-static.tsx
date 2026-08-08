"use client";

import { useTranslations } from "next-intl";
import { FormItemFormListDynamicProps } from "./form-list-dynamic";
import { antdTheme, Text, FormList } from "@/ui/antd";

export default function FormItemFormListStatic<T>(
  props: FormItemFormListDynamicProps<T>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full flex flex-col gap-2">
      {(props.label?.length ?? 0) > 0 ? (
        <Text ellipsis>{props.label}</Text>
      ) : undefined}
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
        {(fields) => (
          <div className="w-full flex flex-col gap-2">
            {fields.map((field, index) => (
              <div
                key={field.key}
                style={{
                  backgroundColor: theme.colorFillQuaternary,
                  borderRadius: theme.borderRadius,
                  borderWidth: "0.5px",
                  borderColor: theme.colorBorder,
                }}
                className="w-full flex flex-col gap-4 p-4"
              >
                <div className="w-full flex items-center justify-between gap-2">
                  <Text type="secondary" ellipsis>
                    {props.labelRow} {index + 1}
                  </Text>
                </div>
                {props.returnFormListRowTemplate
                  ? props.returnFormListRowTemplate(field, index)
                  : undefined}
              </div>
            ))}
          </div>
        )}
      </FormList>
    </div>
  );
}
