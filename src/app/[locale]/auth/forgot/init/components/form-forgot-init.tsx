import Link from "next/link";
import { ForgotInitEmailRequest } from "@/lib/api/user/auth/request";
import FormItemInputEmail from "@/components/form-item/input/input-email";
import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import { Form, FormItem, Button } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormForgotInit(props: {
  loading?: boolean;
  errorMessage?: string;
  onSubmit?: (values: ForgotInitEmailRequest) => void;
}) {
  // Next hooks
  const tPages = useTranslations("Pages.auth.forgot.init.form");
  const tWords = useTranslations("Words");

  return (
    <Form<ForgotInitEmailRequest>
      name="forgot-init-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      autoComplete="on"
      className="w-full"
    >
      <FormItemInputEmail
        disabled={props.loading}
        required={true}
        name="email"
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
