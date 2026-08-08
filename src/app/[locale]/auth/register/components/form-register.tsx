import Link from "next/link";
import { SignInEmailRequest } from "@/lib/api/user/auth/request";
import FormItemInputEmail from "@/components/form-item/input/input-email";
import FormItemInputPassword from "@/components/form-item/input/input-password";
import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import { Form, FormItem, Button } from "@/ui/antd";
import FormItemInputConfirmPassword from "@/components/form-item/input/input-confirm-password";
import { useTranslations } from "next-intl";

export default function FormRegister(props: {
  loading?: boolean;
  errorMessage?: string;
  onSubmit?: (values: SignInEmailRequest) => void;
}) {
  // Next hooks
  const tPages = useTranslations("Pages.auth.register.form");
  const tWords = useTranslations("Words");

  return (
    <Form<SignInEmailRequest>
      name="login-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      autoComplete="on"
      className="w-full"
    >
      <FormItemInputEmail
        disabled={props.loading}
        name="email"
        required={true}
        size="large"
      />
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
          {tWords("register")}
        </Button>
      </FormItem>
      <div className="w-full flex flex-wrap justify-center items-center gap-2">
        {tPages("extra.alreadyHaveAccount")}{" "}
        <Link href="/auth/login">{tWords("login")}</Link>
      </div>
    </Form>
  );
}
