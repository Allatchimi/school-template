import { formatDateTimeToUnix } from "@/helpers/date/format";
import { hashPassword } from "@/helpers/security/hash";
import {
  signInWithCredentialsEmailServerSide,
  signInWithProviderServerSide,
} from "@/lib/api/user/auth/routes";
import { getProfileServerSide } from "@/lib/api/user/profile/routes";
import { UserInfoResponse, UserResponse } from "@/lib/api/user/user/response";
import { HttpStatusCode } from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  secret: process.env.NEXT_AUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
        },
        phoneNumber: {
          label: "Phone Number",
        },
        password: {
          label: "Password",
          type: "password",
        },
        stayConnected: {
          label: "Stay Connected",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error(`invalid credentials!`);

        // Retrieve credentials
        const email: string = credentials?.email as string | "";
        const passwordHashed: string = await hashPassword(
          credentials?.password as string | ""
        );
        const stayConnected: boolean =
          (credentials?.stayConnected as string | "").toLowerCase() === "true";

        // Sign in to the backend
        try {
          const resData = await signInWithCredentialsEmailServerSide({
            email: email,
            password: passwordHashed,
            stayConnected: stayConnected,
          });
          return {
            ...resData?.data,
          };
        } catch (error: any) {
          console.error("error when trying to sign in!", error);
          console.error(error);
          return {
            ...{
              code: error?.code,
              error: "error when trying to sign in.",
              ok: false,
              status: error?.status,
              response: error?.response,
              email: email,
            },
          };
        }
      },
    }),
    Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Facebook({
      clientId: `${process.env.FACEBOOK_CLIENT_ID}`,
      clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const resData = user as any;
      const activateAccountToken = resData?.activateAccountToken as
        | string
        | undefined;
      const accessToken = resData?.accessToken as string | undefined;

      // Check if the credentials account is verified
      if (account?.type === "credentials") {
        if (!accessToken || accessToken.length < 1) {
          if (activateAccountToken && activateAccountToken.length > 0) {
            return `/auth/activate?token=${activateAccountToken}`;
          }
        }
      }

      // The account is verified, now check the access token
      if (accessToken && accessToken.length > 0) {
        return true;
      }

      // Check if the account is disabled
      if (resData?.status === HttpStatusCode.UnavailableForLegalReasons) {
        console.error("account disabled!");
        return `/disabled/user`;
      }

      console.error("invalid or empty sign in token!", resData);
      return false;
    },
    async jwt({ token, trigger, session, user, account }) {
      // When jwt is called from callback sign in, load user data to the session variable
      if (account) {
        let newToken: string = user?.accessToken ?? "";
        let newTokenExpires: string = user?.expires ?? "";
        if (account?.provider === "google") {
          try {
            const respData = await signInWithProviderServerSide(
              account?.provider ?? "",
              account?.id_token ?? ""
            );
            newToken = respData?.data?.accessToken ?? "";
            newTokenExpires = respData?.data?.expires ?? "";
          } catch (error: any) {
            console.error("error when trying to sign in with google!", error);
            console.error(error?.response?.data);
            return null;
          }
        }
        if (newToken.length < 1 || newTokenExpires.length < 1) {
          console.error("invalid or empty token!");
          return null;
        }

        // Get user information
        try {
          const respData = await getProfileServerSide(newToken);
          const tempToken = LoadUserToken(respData?.data ?? undefined);
          const oldToken = token;
          token = {
            ...oldToken,
            ...tempToken,
          };
        } catch (error: any) {
          console.error("error when trying to get profile information!", error);
          console.error(error?.response?.data);
          return null;
        }

        token.accessToken = newToken;
        token.accessTokenExpires = newTokenExpires;
        return {
          ...token,
        };
      }

      // Check if the user is updated
      if (trigger === "update" && session?.user) {
        const tempToken = LoadUserInfoToken(
          session.user as UserInfoResponse | undefined
        );
        const oldToken = token;
        token = {
          ...oldToken,
          ...tempToken,
        };
        console.info("session updated!", token);
      }

      // When jwt is called from other callback than sign in, just check the expires field from the token
      const tokenExp: number = token.exp ?? 0;
      const currentDateUnix: number = formatDateTimeToUnix();
      if (tokenExp > 0 && currentDateUnix < tokenExp) {
        return {
          ...token,
        };
      }
      return null;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.user.loginMethod = token.loginMethod as string | undefined;
      session.user.provider = token.provider as string | undefined;
      session.user.role = token.role as string | undefined;
      session.user.feature = token.feature as string | undefined;
      session.user.nameTrunc = token.nameTrunc as string | undefined;
      session.user.firstName = token.firstName as string | undefined;
      session.user.lastName = token.lastName as string | undefined;
      session.user.image = token.image as string | undefined;
      return session;
    },
    async redirect({ url }) {
      const frontendUrl: string = process.env.NEXT_AUTH_URL ?? "";
      if (url.startsWith("/")) {
        return `${frontendUrl}${url}`;
      }
      return frontendUrl;
    },
  },
  debug: process.env.NODE_ENV !== "production",
});

function LoadUserToken(user?: UserResponse) {
  const token: any = {
    loginMethod: user?.loginMethod,
    provider: user?.provider,
    role: user?.role?.name,
    feature: user?.role?.feature,
    ...LoadUserInfoToken(user?.info ?? undefined),
  };

  return token;
}

function LoadUserInfoToken(userInfo?: UserInfoResponse) {
  const userName: string = userInfo?.username ?? "";
  const firstName: String = userInfo?.firstName ?? "";
  const lastName: string = userInfo?.lastName ?? "";

  const usernameTrunc = userName.substring(0, 2);
  const fullNameTrunc =
    firstName.substring(0, 1) + "" + lastName.substring(0, 1);
  const nameTrunc = fullNameTrunc.length > 1 ? fullNameTrunc : usernameTrunc;

  const token: any = {
    nameTrunc: nameTrunc,
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    image: userInfo?.image,
  };

  return token;
}
