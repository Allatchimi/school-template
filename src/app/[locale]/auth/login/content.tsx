"use client";

import FormLogin from "./components/form-login";
import LogoHeader from "@/components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { SignInEmailRequest } from "@/lib/api/user/auth/request";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PageContent() {
  // React hooks
  const router = useCustomRouter();
  const [error, setError] = useState("");

  // Next hooks
  const tPages = useTranslations("Pages.auth.login");
  const tWords = useTranslations("Words");

  // Ant design hooks
  const [form] = useForm<SignInEmailRequest>();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const signInWithCredentialMutation = useMutation({
    mutationFn: async (values: SignInEmailRequest) =>
      signIn("credentials", {
        redirect: false,
        redirectTo: "/profile",
        email: values.email,
        password: values.password,
        stayConnected: values.stayConnected,
      })
        .then((data) => {
          if (data?.error && data.error.length > 0) {
            setError(tPages("form.error.invalidEmailPassword"));
            return;
          }
          if (data?.url) {
            router.push(data.url);
          }
        })
        .catch(() => {
          setError(tPages("form.error.default"));
        }),
  });

  const onSubmitGoogleMutation = useMutation({
    mutationFn: () => {
      return signIn("google", {
        redirect: true,
        redirectTo: "/",
      });
    },
  });

  return (
    <>
      <CustomContainerFullHeight>
        <div className="w-full flex flex-col items-center justify-center">
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
              borderWidth: "0.5px",
              borderColor: theme.colorBorder,
            }}
            className="w-full max-w-[450px] flex flex-col items-center justify-center gap-6 p-8"
          >
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
            <FormLogin
              loading={signInWithCredentialMutation.isPending}
              form={form}
              errorMessage={error.length > 0 ? error : undefined}
              onSubmitCredentials={(formData) => {
                setError("");
                signInWithCredentialMutation.mutate(formData);
              }}
              onSubmitGoogle={() => {
                setError("");
                onSubmitGoogleMutation.mutate();
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
        </div>
      </CustomContainerFullHeight>
    </>
  );
}
