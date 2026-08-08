"use client";

import Link from "next/link";
import { ForgotNewPasswordRequest } from "@/lib/api/user/auth/request";
import FormItemInputPassword from "@/components/form-item/input/input-password";
import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import { Form, FormItem, Button } from "@/ui/antd";
import FormItemInputConfirmPassword from "@/components/form-item/input/input-confirm-password";
import { useTranslations } from "next-intl";

export default function FormForgotNewPassword(props: {
  loading?: boolean;
  errorMessage?: string;
  onSubmit?: (values: ForgotNewPasswordRequest) => void;
}) {
  // Next hooks
  const tPages = useTranslations("Pages.auth.forgot.newPassword.form");
  const tWords = useTranslations("Words");

  return (
    <Form<ForgotNewPasswordRequest>
      name="forgot-newpassword-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      autoComplete="on"
      className="w-full"
    >
      <FormItemInputPassword
        disabled={props.loading}
        name="password"
        required={true}
        size="large"
      />
      <FormItemInputConfirmPassword
        disabled={props.loading}
        name="confirmPassword"
        label={tWords("confirmPassword")}
        placeholder={tWords("confirmPassword")}
        required={true}
        size="large"
      />

      <br />

      <FormAlertDefaultError errorMessage={props.errorMessage} />
      <FormItem>
        <Button
          loading={props.loading}
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          {tWords("save")}
        </Button>
      </FormItem>
      <div className="w-full flex flex-wrap justify-center items-center gap-2">
        {tPages("extra.alreadyHaveAccount")}{" "}
        <Link href="/auth/login">{tWords("login")}</Link>
      </div>
    </Form>
  );
}
