import { POST } from "@/lib/http/http";
import {
  ActivateRequest,
  ForgotCodeRequest,
  ForgotInitEmailRequest,
  ForgotInitPhoneNumberRequest,
  ForgotNewPasswordRequest,
  SignInEmailRequest,
  SignInProviderRequest,
  SignUpEmailRequest,
} from "./request";
import {
  ActivateResponse,
  ForgotCodeResponse,
  ForgotInitResponse,
  ForgotNewPasswordResponse,
  SignInResponse,
} from "./response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/auth`;

// Sign in
export async function signInWithCredentialsEmailServerSide(
  data: SignInEmailRequest
) {
  const tmpPath = `${process.env.API_BASE_URL}/auth`;
  return POST<SignInResponse, SignInEmailRequest>(
    `${tmpPath}/login/email`,
    data,
    {
      headers: {
        "X-School-Id": process.env.SCHOOL_ID,
        "X-School-Api-Key": process.env.SCHOOL_API_KEY,
      },
    }
  );
}
export async function signInWithProviderServerSide(
  provider: string,
  token: string
) {
  const tmpPath = `${process.env.API_BASE_URL}/auth`;
  return POST<SignInResponse, SignInProviderRequest>(
    `${tmpPath}/login/provider`,
    {
      provider: provider,
      token: token,
    },
    {
      headers: {
        "X-School-Id": process.env.SCHOOL_ID,
        "X-School-Api-Key": process.env.SCHOOL_API_KEY,
      },
    }
  );
}
// Sign up
export async function signUpWithCredentialsEmail(data: SignUpEmailRequest) {
  const newData = data;
  newData.confirmPassword = undefined;
  return POST<SignInResponse, SignInEmailRequest>(
    `${PATH_GROUP}/register/email`,
    newData
  );
}
// Activate
export async function activateAccount(data: ActivateRequest) {
  return POST<ActivateResponse, ActivateRequest>(
    `${PATH_GROUP}/activate`,
    data
  );
}

// Forgot
export async function forgotPasswordInitEmail(data: ForgotInitEmailRequest) {
  return POST<ForgotInitResponse, ForgotInitEmailRequest>(
    `${PATH_GROUP}/forgot/initemail`,
    data
  );
}
export async function forgotPasswordInitPhoneNumber(
  data: ForgotInitPhoneNumberRequest
) {
  return POST<ForgotInitResponse, ForgotInitPhoneNumberRequest>(
    `${PATH_GROUP}/forgot/initphone`,
    data
  );
}
export async function forgotPasswordCode(data: ForgotCodeRequest) {
  return POST<ForgotCodeResponse, ForgotCodeRequest>(
    `${PATH_GROUP}/forgot/checkcode`,
    data
  );
}
export async function forgotPasswordNewPassword(
  data: ForgotNewPasswordRequest
) {
  const newData = data;
  newData.confirmPassword = undefined;
  return POST<ForgotNewPasswordResponse, ForgotNewPasswordRequest>(
    `${PATH_GROUP}/forgot/newpassword`,
    newData
  );
}
