import Link from "next/link";
import { ActivateRequest } from "@/lib/api/user/auth/request";
import FormAlertDefaultError from "@/components/form-item/alert/default-error";
import FormItemInputOtp from "@/components/form-item/input/input-otp";
import { Form, FormItem, Button } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormActivateAccount(props: {
  loading?: boolean;
  errorMessage?: string;
  onSubmit?: (values: ActivateRequest) => void;
}) {
  // Next hooks
  const tPages = useTranslations("Pages.auth.activate.init.form");
  const tWords = useTranslations("Words");

  return (
    <Form<ActivateRequest>
      name="activate-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      autoComplete="on"
      className="w-full text-center"
    >
      <FormItemInputOtp name="code" required={true} size="large" />

      <br />

      <FormAlertDefaultError errorMessage={props.errorMessage} />
      <FormItem>
        <Button
          loading={props.loading}
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          {tWords("activate")}
        </Button>
      </FormItem>
      <div className="w-full flex flex-wrap justify-center items-center gap-2">
        {tPages("extra.alreadyHaveAccount")}{" "}
        <Link href="/auth/login">{tWords("login")}</Link>
      </div>
    </Form>
  );
}
