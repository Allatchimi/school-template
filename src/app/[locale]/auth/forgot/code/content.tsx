"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { useMutation } from "@tanstack/react-query";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { HttpStatusCode } from "axios";
import LogoHeader from "@/components/header/logo-header";
import FormForgotCode from "./components/form-forgot-code";
import { getSearchParam } from "@/helpers/url/search-param";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { ForgotCodeRequest } from "@/lib/api/user/auth/request";
import { forgotPasswordCode } from "@/lib/api/user/auth/routes";
import { antdTheme, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // React hooks
  const router = useCustomRouter();

  // Next hooks
  const tPages = useTranslations("Pages.auth.forgot.checkCode");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Tanstack hooks
  const mutationForgot = useMutation({
    mutationFn: async (values: ForgotCodeRequest) => forgotPasswordCode(values),
    onSuccess(data) {
      router.push(`/auth/forgot/newpassword?token=${data.data?.token}`);
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
          <FormForgotCode
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
              const newValues = values;
              newValues.code = values.code;
              newValues.token =
                getSearchParam(window.location.href, "token") ?? undefined;
              mutationForgot.mutate(newValues);
            }}
          />
        </div>
      </CustomContainerFullHeight>
    </>
  );
}
