"use client";

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { App } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { AxiosError, HttpStatusCode } from "axios";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

let isLoggingOut = false;

function makeQueryClient(
  message?: MessageInstance,
  sessionStatus?: "authenticated" | "unauthenticated" | "loading",
  fetchErrorMsg?: string
) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: 1,
        staleTime: 5 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        const status =
          (error as AxiosError | undefined)?.response?.status ??
          (error as AxiosError | undefined)?.status ??
          HttpStatusCode.InternalServerError;
        if (status === 401) {
          if (sessionStatus === "authenticated" && !isLoggingOut) {
            isLoggingOut = true;
            signOut({
              callbackUrl: "/auth/invalidsession",
              redirect: true,
            });
          }
        } else if (status >= 500) {
          message?.error({
            content: fetchErrorMsg ?? "",
            key: "fetchError",
            duration: 5,
          });
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(
  message?: MessageInstance,
  sessionStatus?: "authenticated" | "unauthenticated" | "loading",
  defaultErrMsg?: string
) {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(message, sessionStatus, defaultErrMsg);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient)
      browserQueryClient = makeQueryClient(
        message,
        sessionStatus,
        defaultErrMsg
      );
    return browserQueryClient;
  }
}
export default function CustomQueryClientProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Next hooks
  const session = useSession();
  const t = useTranslations("Components.tanstack");

  // Toast message
  const { message } = App.useApp();

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient(
    message,
    session.status,
    t("defaultError")
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
