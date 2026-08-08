import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import { getToken, JWT } from "next-auth/jwt";
import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_PARENT,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "./lib/constants/user/feature";
import {
  PATH_API_BASE_URL_INTERNAL,
  PATH_CDN_URL_INTERNAL,
  PATH_INVALID_FEATURE_PERMISSION,
  PATH_PROTECTED_ADMIN,
  PATH_PROTECTED_DIRECTOR,
  PATH_PROTECTED_LIST,
  PATH_PROTECTED_LIST_SUPER_ADMIN,
  PATH_PROTECTED_PARENT,
  PATH_PROTECTED_STUDENT,
  PATH_PROTECTED_TEACHER,
  PATH_PUBLIC_ADMIN_HELP,
  PATH_PUBLIC_ADMINS,
  PATH_PUBLIC_SCHOOL_HELP,
  PATH_PUBLIC_SCHOOL_HOME,
  PATH_PUBLIC_SCHOOLS,
} from "./lib/constants/routes";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { LOCALE_DEFAULT, LOCALES } from "./lib/constants/locales";
import { getUserLocale } from "./services/locale";

export default auth(async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const hostWithProtocol = req.nextUrl.protocol + "//" + req.nextUrl.host;
  const jwt = await parseJwtToken(req);
  const accessToken = jwt?.accessToken as string | undefined;

  // Parse locale
  const locales: string[] = LOCALES;
  const locale = await parseLocale(pathname, locales);

  // Rewrite to API url
  if (pathname.startsWith(PATH_API_BASE_URL_INTERNAL)) {
    const newHeaders = new Headers(req.headers);
    // Set Content-Type
    newHeaders.set("Content-Type", "application/json");
    // Set Accept
    newHeaders.set("Accept", "application/json");
    newHeaders.set("Accept-Language", locale);
    // Set school api key and id
    const schoolApiKey: string = process.env.SCHOOL_API_KEY ?? "";
    const schoolID: string = process.env.SCHOOL_ID ?? "";
    newHeaders.set("X-School-Api-Key", schoolApiKey);
    newHeaders.set("X-School-Id", schoolID);
    // Set Authorization
    if (accessToken && accessToken.length > 0) {
      newHeaders.set("Authorization", `Bearer ${accessToken}`);
    }
    // Set school API key
    newHeaders.set("School-API-Key", `${process.env.SCHOOL_API_KEY}`);
    return NextResponse.rewrite(req.nextUrl, {
      request: {
        headers: newHeaders,
      },
    });
  }

  // Rewrite to CDN
  if (pathname.startsWith(PATH_CDN_URL_INTERNAL)) {
    const newHeaders = new Headers(req.headers);
    newHeaders.set("X-API-Key", `${process.env.CDN_KEY}`);
    return NextResponse.rewrite(req.nextUrl, {
      request: {
        headers: newHeaders,
      },
    });
  }

  // Rewrite with locale
  if (startsWithLocale(pathname, locales) !== true) {
    const newUrl = new URL(
      `/${locale}${req.nextUrl.pathname}`,
      hostWithProtocol
    );
    newUrl.search = req.nextUrl.searchParams.toString();
    return NextResponse.redirect(newUrl);
  }

  // Create locale middleware
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(req);

  // Load env variables
  const envSchoolApiKey = process.env.SCHOOL_API_KEY;

  // Format path name without locale
  let pathnameWithoutLocale = pathname;
  for (const loc of locales) {
    if (pathname.startsWith(`/${loc}`)) {
      pathnameWithoutLocale = pathname.slice(loc.length + 1);
      break;
    }
  }
  if (pathnameWithoutLocale.length < 1) {
    pathnameWithoutLocale = "/";
  }

  // Check auth routes
  if (
    pathnameWithoutLocale === "/auth/register" &&
    !(envSchoolApiKey && envSchoolApiKey.length > 0)
  ) {
    const newUrl = new URL(PATH_PUBLIC_SCHOOL_HOME, hostWithProtocol);
    newUrl.search = req.nextUrl.searchParams.toString();
    return NextResponse.redirect(newUrl);
  }

  // Check home routes
  if (
    pathnameWithoutLocale === "/" &&
    envSchoolApiKey &&
    envSchoolApiKey.length > 0
  ) {
    const newUrl = new URL(PATH_PUBLIC_SCHOOL_HOME, hostWithProtocol);
    newUrl.search = req.nextUrl.searchParams.toString();
    return NextResponse.redirect(newUrl);
  } else if (
    pathnameWithoutLocale.startsWith(PATH_PUBLIC_SCHOOL_HOME) &&
    !envSchoolApiKey
  ) {
    const errorUrl = new URL("/404", hostWithProtocol);
    errorUrl.search = req.nextUrl.searchParams.toString();
    return NextResponse.redirect(errorUrl);
  }
  // Check help routes
  if (pathnameWithoutLocale === "/help") {
    if (envSchoolApiKey && envSchoolApiKey.length > 0) {
      const newUrl = new URL(PATH_PUBLIC_SCHOOL_HELP, hostWithProtocol);
      newUrl.search = req.nextUrl.searchParams.toString();
      return NextResponse.redirect(newUrl);
    } else {
      const newUrl = new URL(PATH_PUBLIC_ADMIN_HELP, hostWithProtocol);
      newUrl.search = req.nextUrl.searchParams.toString();
      return NextResponse.redirect(newUrl);
    }
  }

  // Check public admin and school routes
  if (
    PATH_PUBLIC_ADMINS.some((path) => pathnameWithoutLocale.startsWith(path))
  ) {
    if (envSchoolApiKey && envSchoolApiKey.length > 0) {
      const errorUrl = new URL("/404", hostWithProtocol);
      errorUrl.search = req.nextUrl.searchParams.toString();
      return NextResponse.redirect(errorUrl);
    }
  } else if (
    PATH_PUBLIC_SCHOOLS.some((path) => pathnameWithoutLocale.startsWith(path))
  ) {
    if (!(envSchoolApiKey && envSchoolApiKey.length > 0)) {
      const errorUrl = new URL("/404", hostWithProtocol);
      errorUrl.search = req.nextUrl.searchParams.toString();
      return NextResponse.redirect(errorUrl);
    }
  }

  const isAuthenticated = accessToken && accessToken?.length >= 1;
  // Check protected routes
  if (
    PATH_PROTECTED_LIST.some((path) => pathnameWithoutLocale.startsWith(path))
  ) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", hostWithProtocol);
      loginUrl.search = req.nextUrl.searchParams.toString();
      return NextResponse.redirect(loginUrl);
    }

    // Check permission feature
    const feature = parseRoleFeature(jwt);
    const invalidPermissionUrl = new URL(
      PATH_INVALID_FEATURE_PERMISSION,
      hostWithProtocol
    );
    invalidPermissionUrl.search = req.nextUrl.searchParams.toString();
    // Only for super admin
    if (
      PATH_PROTECTED_LIST_SUPER_ADMIN.some((path) =>
        pathnameWithoutLocale.startsWith(path)
      )
    ) {
      if (feature != FEATURE_ADMIN) {
        return NextResponse.redirect(invalidPermissionUrl);
      }
    }
    // Check others roles
    if (
      pathnameWithoutLocale.startsWith(PATH_PROTECTED_ADMIN) &&
      feature != FEATURE_ADMIN &&
      pathnameWithoutLocale.startsWith(PATH_PROTECTED_DIRECTOR) &&
      feature != FEATURE_DIRECTOR
    ) {
      return NextResponse.redirect(invalidPermissionUrl);
    } else if (
      pathnameWithoutLocale.startsWith(PATH_PROTECTED_TEACHER) &&
      feature != FEATURE_TEACHER
    ) {
      return NextResponse.redirect(invalidPermissionUrl);
    } else if (
      pathnameWithoutLocale.startsWith(PATH_PROTECTED_STUDENT) &&
      feature != FEATURE_STUDENT
    ) {
      return NextResponse.redirect(invalidPermissionUrl);
    } else if (
      pathnameWithoutLocale.startsWith(PATH_PROTECTED_PARENT) &&
      feature != FEATURE_PARENT
    ) {
      return NextResponse.redirect(invalidPermissionUrl);
    }
  }

  // Check if the user is authenticated and try to access /auth pages
  if (isAuthenticated) {
    if (pathnameWithoutLocale.startsWith("/auth")) {
      const errorUrl = new URL("/404", hostWithProtocol);
      errorUrl.search = req.nextUrl.searchParams.toString();
      return NextResponse.redirect(errorUrl);
    }
  }

  return response;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|manifest|service-worker|.well-known).*)",
  ],
};

const parseJwtToken = async (req: NextRequest) => {
  // Get token from cookie
  let cookieKey =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";
  let jwtToken = await getToken({
    secret: `${process.env.NEXT_AUTH_SECRET}`,
    req: req,
    salt: cookieKey,
    cookieName: cookieKey,
  });

  // Get token from cookie if not found
  if (!jwtToken) {
    cookieKey = "authjs.session-token";
    jwtToken = await getToken({
      secret: `${process.env.NEXT_AUTH_SECRET}`,
      req: req,
      salt: cookieKey,
      cookieName: cookieKey,
    });
    return jwtToken ?? undefined;
  }
  return jwtToken;
};

const parseRoleFeature = (jwtToken?: JWT) => {
  const feature: string = (jwtToken?.feature as string | undefined) ?? "";
  return feature;
};

const parseLocale = async (pathname: string, locales: string[]) => {
  let locale = LOCALE_DEFAULT;
  const tempLocale = parseLocaleFromPath(pathname, locales);
  if (!tempLocale || tempLocale.length < 2) {
    locale = await getUserLocale();
  } else {
    locale = tempLocale;
  }
  return locale;
};

const parseLocaleFromPath = (pathname: string, locales: string[]) => {
  for (let index = 0; index < locales.length; index++) {
    if (pathname.startsWith(`/${locales[index]}`)) {
      return locales[index];
    }
  }
  return undefined;
};

const startsWithLocale = (pathname: string, locales: string[]) => {
  return locales.some((locale) => pathname.startsWith(`/${locale}`));
};
