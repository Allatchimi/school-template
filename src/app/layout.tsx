import type { Metadata, Viewport } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import CustomQueryClientProvider from "@/providers/tanstack";
import { SessionProvider } from "next-auth/react";
import AntdTheme from "@/providers/antd-theme";
import NextTopLoader from "nextjs-toploader";
import { getProfileServerSide } from "@/lib/api/user/profile/routes";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { SchoolConfigProvider } from "@/providers/school-config";
import NotificationProvider from "@/providers/notification";
import WebPushProvider from "@/providers/web-push";
import { COLOR_SCHEME } from "@/lib/constants/others/color";
import { SCHOOL_STATUS_DISABLED } from "@/lib/constants/school/common/school";
import { redirect } from "next/navigation";
import { UserResponse } from "@/lib/api/user/user/response";
import { USER_STATUS_DISABLED } from "@/lib/constants/user/user";
import { YearResponse } from "@/lib/api/school/common/year/response";
import { getInitializeServerSide } from "@/lib/api/others/initialize/routes";
import LogoutHandler from "@/components/handler/logout";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { auth } from "../../auth";
import { getLocale } from "next-intl/server";
import { setDateTimeLocaleLanguage } from "@/helpers/date/format";
import { LOCALE_DEFAULT, LOCALES } from "@/lib/constants/locales";

// Import the Ant Design v5 compatibility patch
import "@ant-design/v5-patch-for-react-19";

import "../styles/globals.css";
import "../styles/modal.scss";

export const viewport: Viewport = {
  themeColor: "white",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000"
  ),
  title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
  description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
    description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: `/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  keywords: [
    process.env.NEXT_PUBLIC_APP_NAME || "",
    process.env.NEXT_PUBLIC_WEBSITE_TITLE || "",
    "School management",
    "Teacher",
    "Student",
    "Parent",
    "Enroll",
    "Dashboard",
    "Home",
    "Gestion scolaire",
    "Enseignant",
    "Etudiant",
    "Parent",
    "Inscription",
    "Dashboard",
    "Accueil",
  ],
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale = await getLocale();
  if (LOCALES.includes(locale) === false) {
    locale = LOCALE_DEFAULT;
  }
  // Set locale for dayjs
  setDateTimeLocaleLanguage(locale);

  // Check user session
  const sessionResp = await checkUserSession();

  // Load school config
  const envSchoolID: number | undefined = parseInt(
    process.env.SCHOOL_ID || "0"
  );
  let envSchoolApiKey: string | undefined = process.env.SCHOOL_API_KEY;
  let schoolType: string | undefined = undefined;
  let schoolData: SchoolResponse | undefined;
  let years: YearResponse[] | undefined;
  let isPreloadError = true;
  if (envSchoolID > 0 && envSchoolApiKey) {
    try {
      const data = await getInitializeServerSide(
        sessionResp?.accessToken ?? undefined,
        envSchoolID,
        envSchoolApiKey
      );
      schoolType = data.data?.school?.type ?? undefined;
      schoolData = data.data?.school ?? undefined;
      years = data.data?.years ?? undefined;
      isPreloadError = false;
    } catch {
    } finally {
      // Cleanup the school api key
      envSchoolApiKey = undefined;
    }
  } else {
    isPreloadError = false;
  }

  // Check status
  if (schoolData?.status === SCHOOL_STATUS_DISABLED) {
    redirect("/disabled/school");
  }
  if (sessionResp?.data?.status === USER_STATUS_DISABLED) {
    redirect("/disabled/user");
  }

  // Add organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: process.env.NEXT_PUBLIC_APP_NAME,
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    logo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/assets/images/logos/logo.png`,
  };
  const sanitizedSchema = JSON.stringify(organizationSchema);

  return (
    <html lang={locale}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizedSchema }}
        />
      </head>
      <body>
        <SessionProvider>
          <NextIntlClientProvider>
            <AntdRegistry>
              <AntdTheme>
                <CustomQueryClientProvider>
                  <NextTopLoader color={COLOR_SCHEME.primary} />
                  <WebPushProvider />
                  <NotificationProvider
                    token={sessionResp?.accessToken ?? undefined}
                    wsUrl={process.env.NEXT_PUBLIC_WS_URL ?? ""}
                  >
                    <SchoolConfigProvider
                      schoolID={envSchoolID}
                      schoolType={schoolType}
                      schoolData={schoolData}
                      years={years}
                      userFeature={sessionResp?.data.role?.feature ?? undefined}
                      isAuthenticated={
                        (sessionResp?.accessToken?.length ?? 0) &&
                        sessionResp?.shouldTriggerLogout !== true
                          ? true
                          : false
                      }
                      isPreloadError={isPreloadError}
                    >
                      {/* The Programmatic Logout Handler */}
                      <LogoutHandler
                        triggerLogout={
                          sessionResp?.shouldTriggerLogout ?? false
                        }
                      />
                      {children}
                    </SchoolConfigProvider>
                  </NotificationProvider>
                </CustomQueryClientProvider>
              </AntdTheme>
            </AntdRegistry>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

/**
 * Check if the user session is valid and return the trigger logout flag
 * Return true if the user should perform a programmatic logout and false otherwise
 */
async function checkUserSession() {
  const session = await auth();
  if (!session) {
    return undefined;
  }

  let respData:
    | AxiosResponse<UserResponse | null | undefined, any>
    | undefined = undefined;
  let shouldTriggerLogout = false;
  try {
    const accessToken = session?.accessToken;
    respData = await getProfileServerSide(accessToken ?? "");
  } catch (error) {
    const status =
      (error as AxiosError | undefined)?.response?.status ??
      (error as AxiosError | undefined)?.status ??
      HttpStatusCode.InternalServerError;
    if (status === HttpStatusCode.Unauthorized) {
      shouldTriggerLogout = true;
    }
  }
  const newData: UserResponse = {
    id: respData?.data?.id,
    school: respData?.data?.school,
    role: respData?.data?.role,
    info: {
      ...respData?.data?.info,
      address: undefined,
      birthday: undefined,
      birthLocation: undefined,
    },
  };
  return {
    data: newData,
    shouldTriggerLogout: shouldTriggerLogout,
    accessToken: session?.accessToken,
  };
}
