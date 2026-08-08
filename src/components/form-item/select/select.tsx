import { SizeType } from "antd/es/config-provider/SizeContext";
import { FormItem, Empty, Select, Text, Spin } from "@/ui/antd";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

export interface SelectOptionType<T extends object | string | number> {
  data?: T;
  label?: ReactNode;
  value?: string | number | null;
}

export interface FormItemSelectProps<T extends object | string | number> {
  loading?: boolean;
  disabled?: boolean;
  defaultValue?: string | string[];
  name?: string | string[];
  label?: string;
  placeholder?: string;
  tooltip?: string;
  autoClearSearchValue?: boolean;
  allowClear?: boolean;
  filterOption?: boolean;
  searchValue?: string;
  allowEmptySelection?: boolean;
  allowEmptySelectionLabel?: string;
  required?: boolean;
  requiredMsg?: string;
  size?: SizeType;
  defaultOptions?: SelectOptionType<T>[];
  options?: SelectOptionType<T>[];
  mode?: "multiple" | "tags";
  width?: string | number;
  noMargin?: boolean;
  noStyle?: boolean;
  style?: React.CSSProperties;
  onOpenChange?: (visible: boolean) => void;
  onSearch?: (value: string) => void;
  optionRender?: (value: SelectOptionType<T>) => React.ReactNode;
  onSelect?: (
    value?: string | number | null,
    option?: SelectOptionType<T> | SelectOptionType<T>[]
  ) => void;
  onChange?: (
    value?: string | number | null,
    option?: SelectOptionType<T> | SelectOptionType<T>[]
  ) => void;
}

export default function FormItemSelect<T extends object | string | number>(
  props: FormItemSelectProps<T>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");

  const margin: React.CSSProperties =
    props.noMargin === true
      ? {
          margin: "0px",
        }
      : {};

  return (
    <FormItem
      initialValue={
        props.defaultValue
          ? props.defaultValue
          : props.allowEmptySelection === true
            ? ""
            : props.defaultValue
      }
      label={props.label}
      name={props.name}
      rules={
        props.required === true
          ? [
              {
                required: true,
                message:
                  props.requiredMsg ?? tSentences("pleaseSelectTheOption"),
              },
            ]
          : []
      }
      tooltip={props.tooltip}
      noStyle={props.noStyle}
      style={{
        ...margin,
      }}
    >
      <Select<string | number | null, SelectOptionType<T>>
        disabled={props.disabled}
        loading={props.loading}
        showSearch={true}
        filterOption={props.filterOption}
        searchValue={props.searchValue}
        allowClear={props.allowClear}
        notFoundContent={
          <Spin spinning={props.loading === true} size="small">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Spin>
        }
        placeholder={props.placeholder}
        size={props.size ?? "middle"}
        optionLabelProp="label"
        mode={props.mode}
        options={
          props.allowEmptySelection === true
            ? [
                {
                  label: props.allowEmptySelectionLabel || "---",
                  value: "",
                },
                ...((props.options?.length ?? 0) > 0
                  ? (props.options ?? [])
                  : (props.defaultOptions ?? [])),
              ]
            : (props.options?.length ?? 0) > 0
              ? (props.options ?? [])
              : (props.defaultOptions ?? [])
        }
        optionRender={(option) => {
          if (props.allowEmptySelection === true && option.value === "*") {
            return <Text ellipsis>{props.allowEmptySelectionLabel}</Text>;
          }

          if (props.optionRender) {
            return props.optionRender({
              data: option.data.data,
              label: option.data.label,
              value: option.data.value,
            });
          } else {
            return <Text ellipsis>{option.label}</Text>;
          }
        }}
        autoClearSearchValue={props.autoClearSearchValue}
        onSearch={props.onSearch}
        onOpenChange={props.onOpenChange}
        onSelect={props.onSelect}
        onChange={props.onChange}
        style={{
          width: props.width || "120px",
          ...props.style,
        }}
      />
    </FormItem>
  );
}
