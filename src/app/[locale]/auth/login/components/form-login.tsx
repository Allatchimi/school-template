import Link from "next/link";
import FormItemCheckbox from "@/components/form-item/checkbox/checkbox";
import { SignInEmailRequest } from "@/lib/api/user/auth/request";
import FormItemInputEmail from "@/components/form-item/input/input-email";
import FormItemInputPassword from "@/components/form-item/input/input-password";
import { Form, FormItem, Button, Text } from "@/ui/antd";
import { SchoolConfig } from "@/config/school";
import { FormInstance } from "antd";
import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import { useTranslations } from "next-intl";

export default function FormLogin(props: {
  loading?: boolean;
  form?: FormInstance<SignInEmailRequest>;
  errorMessage?: string;
  onSubmitCredentials?: (values: SignInEmailRequest) => void;
  onSubmitGoogle?: () => void;
}) {
  // Next hooks
  const tPages = useTranslations("Pages.auth.login.form");
  const tWords = useTranslations("Words");

  return (
    <Form<SignInEmailRequest>
      form={props.form}
      name="login-form"
      layout={"vertical"}
      initialValues={{
        stayConnected: true,
      }}
      onFinish={props.onSubmitCredentials}
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
      <FormItemCheckbox
        disabled={props.loading}
        required={true}
        label={tWords("stayConnected")}
        name="stayConnected"
      />

      <FormAlertDefaultError errorMessage={props.errorMessage} />

      <FormItem>
        <Button
          loading={props.loading}
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          {tWords("login")}
        </Button>
      </FormItem>
      <div className="w-full flex items-center justify-center">
        <Link href="/auth/forgot/init">{tPages("extra.forgotPassword")}</Link>
      </div>
      {SchoolConfig.schoolID() ? (
        <div className="w-full flex flex-wrap justify-center items-center gap-2 mt-4">
          <Text type="secondary">{tPages("extra.dontHaveAccount")}</Text>
          <Link href="/auth/register">{tWords("register")}</Link>
        </div>
      ) : undefined}
    </Form>
  );
}
