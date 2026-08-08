"use server";

import { SchoolConfig } from "@/config/school";
import { LOCALE_DEFAULT, LOCALES } from "@/lib/constants/locales";
import { cookies } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const locale = (await cookies()).get(COOKIE_NAME)?.value;
  return locale || LOCALE_DEFAULT;
}

export async function setUserLocale(locale: string) {
  let newLocale = SchoolConfig.schoolData()?.info?.language || LOCALE_DEFAULT;
  if (LOCALES.includes(locale) === true) {
    newLocale = locale;
  }
  (await cookies()).set(COOKIE_NAME, newLocale);
}
