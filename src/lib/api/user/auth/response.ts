// Sign in
export interface SignInResponse {
  accessToken?: string | null;
  expires?: string | null;
  activateAccountToken?: string | null;
}

// Sign up
export interface SignUpResponse {
  activateAccountToken?: string | null;
  message?: string | null;
}

// Activate
export interface ActivateResponse {
  activatedAt?: string | null;
}

// Forgot
export interface ForgotInitResponse {
  token?: string | null;
}
export interface ForgotCodeResponse {
  token?: string | null;
}
export interface ForgotNewPasswordResponse {
  message?: string | null;
}

// Logout
export interface LogoutResponse {
  message?: string | null;
}
