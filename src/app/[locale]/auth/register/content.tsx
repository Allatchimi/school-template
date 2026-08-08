"use client";

import LogoHeader from "@/components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import FormRegister from "./components/form-register";
import { useMutation } from "@tanstack/react-query";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { HttpStatusCode } from "axios";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { SignUpEmailRequest } from "@/lib/api/user/auth/request";
import { signUpWithCredentialsEmail } from "@/lib/api/user/auth/routes";
import ImageFallback from "@/components/image/image-fallback";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PageContent() {
  // React hooks
  const router = useCustomRouter();

  // Next hooks
  const tPages = useTranslations("Pages.auth.register");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Tanstack hooks
  const mutationSignUp = useMutation({
    mutationFn: async (values: SignUpEmailRequest) =>
      signUpWithCredentialsEmail(values),
    onSuccess(data) {
      router.push(`/auth/activate?token=${data.data?.activateAccountToken}`);
    },
  });

  return (
    <>
      <CustomContainerFullHeight>
        <div
          style={{
            background: theme.colorBgContainer,
            borderRadius: theme.borderRadius,
            borderWidth: "0.5px",
            borderColor: theme.colorBorder,
          }}
          className="w-full max-w-[900px] grid grid-cols-1 lg:grid-cols-2 gap-8 p-8"
        >
          <div className="w-full h-full hidden lg:flex flex-col items-center justify-center">
            <div className="w-full h-[300px] lg:h-[500px]">
              <ImageFallback
                size={500}
                src={"/assets/images/pages/auth/register.jpg"}
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <LogoHeader />
              <div className="w-full flex flex-col items-center justify-center">
                <Title level={2} className="text-center">
                  {tPages("title")}
                </Title>
                <Text className="text-center">
                  {tPages("description", {
                    label: process.env.NEXT_PUBLIC_APP_NAME || "",
                  })}
                </Text>
              </div>
              <FormRegister
                loading={mutationSignUp.isPending}
                errorMessage={
                  mutationSignUp.isError
                    ? HttpMessageFromStatus(
                        (mutationSignUp.error as any)?.response?.data?.status ??
                          HttpStatusCode.InternalServerError,
                        tWords("email"),
                        tHttpStatus
                      )
                    : undefined
                }
                onSubmit={(values) => {
                  mutationSignUp.mutate(values);
                }}
              />
            </div>
          </div>
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
