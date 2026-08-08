"use client";

import FormForgotInit from "./components/form-forgot-init";
import LogoHeader from "@/components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { useMutation } from "@tanstack/react-query";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { HttpStatusCode } from "axios";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { ForgotInitEmailRequest } from "@/lib/api/user/auth/request";
import { forgotPasswordInitEmail } from "@/lib/api/user/auth/routes";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PageContent() {
  // React hooks
  const router = useCustomRouter();

  // Next hooks
  const tPages = useTranslations("Pages.auth.forgot.init");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Tanstack hooks
  const mutationForgot = useMutation({
    mutationFn: async (values: ForgotInitEmailRequest) =>
      forgotPasswordInitEmail(values),
    onSuccess(data) {
      router.push(`/auth/forgot/code?token=${data.data?.token}`);
    },
  });

  return (
    <>
      <CustomContainerFullHeight>
        <div
          style={{
            backgroundColor: theme.colorBgContainer,
            borderRadius: theme.borderRadius,
            borderWidth: "0.5px",
            borderColor: theme.colorBorder,
          }}
          className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8"
        >
          <LogoHeader />
          <div className="w-full flex flex-col items-center justify-center">
            <Title level={2} className="text-center">
              {tPages("title")}
            </Title>
            <Text className="text-center">{tPages("description")}</Text>
          </div>
          <FormForgotInit
            loading={mutationForgot.isPending}
            errorMessage={
              mutationForgot.isError
                ? HttpMessageFromStatus(
                    (mutationForgot.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    tWords("user"),
                    tHttpStatus
                  )
                : undefined
            }
            onSubmit={(values) => {
              mutationForgot.mutate(values);
            }}
          />
        </div>
        <div className="w-full flex item-center justify-center mt-4">
          <Link href="/">
            <Button color="primary" variant="filled">
              {tWords("backToHome")}
            </Button>
          </Link>
        </div>
      </CustomContainerFullHeight>
    </>
  );
}
