"use client";

import { Rule } from "antd/es/form";
import { useTranslations } from "next-intl";

interface FormRuleOptionProps {
  required?: boolean;
  min?: number;
  max?: number;
  regex?: RegExp;
  extra?: Rule[];
}

export function useDefaultFormRule(props: {
  fielLabel: string;
  options?: FormRuleOptionProps;
}): Rule[] {
  const tComponents = useTranslations("Components.form.validation");

  return [
    {
      required: props.options?.required === true,
      message: tComponents("defaultRequired", { label: props.fielLabel }),
    },
    ...(props.options?.min && (props.options?.min ?? 0) > 0
      ? [
          {
            min: props.options.min,
            message: tComponents("defaultMinLength", {
              label: props.options.min,
            }),
          },
        ]
      : []),
    ...(props.options?.max && (props.options?.max ?? 0) > 0
      ? [
          {
            max: props.options.max,
            message: tComponents("defaultMaxLength", {
              label: props.options.max,
            }),
          },
        ]
      : []),
    ...(props.options?.regex
      ? [
          {
            pattern: props.options.regex,
            message: tComponents("defaultRegex", { label: props.fielLabel }),
          },
        ]
      : []),
    ...((props.options?.extra?.length ?? 0) > 0
      ? (props.options?.extra ?? [])
      : []),
  ];
}
