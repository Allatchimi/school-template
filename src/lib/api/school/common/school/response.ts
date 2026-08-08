import {
  BaseResponse,
  DateType,
  BasePaginatedResponse,
} from "@/types/http/base-response";

export interface SchoolResponse extends BaseResponse {
  name?: string | null;
  type?: string | null;
  status?: string | null;

  deploymentRequest?: string | null;
  deploymentStatus?: string | null;
  deploymentFeedback?: string | null;
  deploymentExtra?: string | null;
  deploymentVersion?: number | null;

  favicon?: string | null;
  logo?: string | null;
  logoWhite?: string | null;

  currency?: string | null;
  paymentCount?: number | null;

  info?: SchoolInfoResponse | null;
  config?: SchoolConfigResponse | null;
}

export interface SchoolInfoResponse {
  language?: string | null;
  fullName?: string | null;
  description?: string | null;
  motto?: string | null;

  phoneNumber1?: number | null;
  phoneNumber2?: number | null;
  phoneNumber3?: number | null;

  email1?: string | null;
  email2?: string | null;
  email3?: string | null;

  founder?: string | null;
  foundedAt?: DateType | null;

  address?: string | null;
  locationLongitude?: string | null;
  locationLatitude?: string | null;

  socialMediaTelegram?: string | null;
  socialMediaWhasapp?: string | null;
  socialMediaYoutube?: string | null;
  socialMediaTwitter?: string | null;
  socialMediaFacebook?: string | null;

  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
  image5?: string | null;
}

export interface SchoolConfigResponse {
  websiteDomainName?: string | null;
  userEmailDomainName?: string | null;
  supportEmail?: string | null;

  googleWorkspaceCredentials?: string | null;
  googleWorkspaceUserEmailDomain?: string | null;

  smsUserID?: string | null;
  whatsappToken?: string | null;
  whatsappPhoneID?: number | null;
  telegramBotToken?: string | null;

  websiteTitle?: string | null;
  websiteDescription?: string | null;

  colorPrimary?: string | null;
  colorPrimaryBg?: string | null;
  colorPrimaryBgHover?: string | null;
}

export interface SchoolListResponse extends BasePaginatedResponse {
  data?: SchoolResponse[] | null;
}
