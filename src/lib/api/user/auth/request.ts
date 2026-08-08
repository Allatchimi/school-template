// Sign in
export interface SignInEmailRequest {
  email?: string | null;
  password?: string | null;
  stayConnected?: boolean | null;
}
export interface SignInPhoneNumberRequest {
  phoneNumber?: number | null;
  password?: string | null;
  stayConnected?: boolean | null;
}
export interface SignInProviderRequest {
  provider?: string | null;
  token?: string | null;
}

// Sign up
export interface SignUpEmailRequest {
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}
export interface SignUpPhoneNumberRequest {
  phoneNumber?: number | null;
  password?: string | null;
  confirmPassword?: string | null;
}

// Activate
export interface ActivateRequest {
  code?: string | null;
  token?: string | null;
}

// Forgot
export interface ForgotInitEmailRequest {
  email?: string | null;
}
export interface ForgotInitPhoneNumberRequest {
  phoneNumber?: number | null;
}
export interface ForgotCodeRequest {
  code?: string | null;
  token?: string | null;
}
export interface ForgotNewPasswordRequest {
  password?: string | null;
  confirmPassword?: string | null;
  token?: string | null;
}

// Logout
export interface LogoutRequest {
  message?: string | null;
}
