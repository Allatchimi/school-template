"use client";

import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import FormItemInputOtp from "@/components/form-item/input/input-otp";
import { ForgotCodeRequest } from "@/lib/api/user/auth/request";
import { Form, FormItem, Button } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function FormForgotCode(props: {
  loading?: boolean;
  errorMessage?: string;
  onSubmit?: (values: ForgotCodeRequest) => void;
}) {
  // Next hooks
  const tPages = useTranslations("Pages.auth.forgot.checkCode.form");
  const tWords = useTranslations("Words");

  return (
    <Form<ForgotCodeRequest>
      name="forgot-code-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      autoComplete="on"
      className="w-full text-center"
    >
      <FormItemInputOtp
        disabled={props.loading}
        name="code"
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
          {tWords("submit")}
        </Button>
      </FormItem>
      <div className="w-full flex flex-wrap justify-center items-center gap-2">
        {tPages("extra.alreadyHaveAccount")}{" "}
        <Link href="/auth/login">{tWords("login")}</Link>
      </div>
    </Form>
  );
}
