import { LOCALE_DEFAULT, LOCALES } from "@/lib/constants/locales";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: LOCALE_DEFAULT,
  localePrefix: "always",
  localeDetection: true,
});
