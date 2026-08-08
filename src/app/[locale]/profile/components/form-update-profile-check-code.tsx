"use client";

import CustomForm, { CustomFormProps } from "@/components/form/form";
import { useForm } from "antd/es/form/Form";
import FormItemInputOtp from "@/components/form-item/input/input-otp";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

interface FormUpdateCheckCodeProps<T extends object> {
  loading?: boolean;
  formName?: string;
  item?: T;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (value?: T) => void;
  onSubmit: (value?: T) => void;
  onCancel: () => void;
}

export function FormUpdateProfileCheckCode<T extends object>(
  props: CustomFormProps<T, T> & FormUpdateCheckCodeProps<T>
) {
  // React hooks
  const [form] = useForm<T>();

  // Next hooks
  const tPage = useTranslations("Pages.profile.form");

  const handleValuesChange = (values: T) => {
    const newValues = values;
    if (props.onValuesChange) {
      props.onValuesChange(newValues);
    }
  };

  const handleFinish = (values: T) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  };

  return (
    <CustomForm
      {...props}
      form={form}
      name={props.formName ?? "form-update-profile-check-code"}
      layout={"vertical"}
      className="w-full"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      autoComplete="on"
    >
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div>
          <Text className="text-center">
            {tPage("title.updateProfileCheckCode")}
          </Text>
        </div>
        <div>
          <FormItemInputOtp name="code" required={true} size="large" />
        </div>
      </div>
    </CustomForm>
  );
}
