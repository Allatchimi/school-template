import { castFileToStringUrl } from "@/helpers/cast/file";
import { BaseRequest } from "@/types/http/base-request";
import { DateType } from "@/types/http/base-response";
import { FilterRequest } from "@/types/http/filter/request";
import { PaginationRequest } from "@/types/http/pagination/request";
import { UploadFile } from "antd";
import { SchoolResponse } from "./response";

export interface SchoolRequest extends BaseRequest {
  name?: string | null;
  type?: string | null;
  status?: string | null;

  favicon?: string | null;
  logo?: string | null;
  logoWhite?: string | null;

  currency?: string | null;
  paymentCount?: number | null;

  config?: SchoolConfigRequest | null;
  info?: SchoolInfoRequest | null;
}

export interface SchoolConfigRequest extends BaseRequest {
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

export interface SchoolInfoRequest extends BaseRequest {
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

export interface SchoolListRequest extends FilterRequest, PaginationRequest {
  type?: string | null;
}

// Format request
export function formatSchoolFormToRequest(item?: SchoolRequest) {
  if (!item) {
    return;
  }
  const tempFavicons = castFileToStringUrl(
    item.favicon as UploadFile[] | undefined
  );
  const tempLogos = castFileToStringUrl(item.logo as UploadFile[] | undefined);
  const tempLogosWhite = castFileToStringUrl(
    item.logoWhite as UploadFile[] | undefined
  );
  const tempImages = castFileToStringUrl(
    item.info?.image1 as UploadFile[] | undefined
  );

  const newItem: SchoolRequest = {
    ...item,
    favicon: tempFavicons.length > 0 ? tempFavicons[0] : undefined,
    logo: tempLogos.length > 0 ? tempLogos[0] : undefined,
    logoWhite: tempLogosWhite.length > 0 ? tempLogosWhite[0] : undefined,

    paymentCount:
      `${item.paymentCount ?? ""}`.length > 0
        ? parseInt(`${item.paymentCount}`)
        : undefined,

    config: {
      ...item.config,
    },
    info: {
      ...item.info,

      phoneNumber1:
        `${item.info?.phoneNumber1 ?? ""}`.length > 0
          ? parseInt(`${item.info?.phoneNumber1}`)
          : undefined,
      phoneNumber2:
        `${item.info?.phoneNumber2 ?? ""}`.length > 0
          ? parseInt(`${item.info?.phoneNumber2}`)
          : undefined,
      phoneNumber3:
        `${item.info?.phoneNumber3 ?? ""}`.length > 0
          ? parseInt(`${item.info?.phoneNumber3}`)
          : undefined,

      image1: tempImages.length > 0 ? tempImages[0] : undefined,
      image2: tempImages.length > 1 ? tempImages[1] : undefined,
      image3: tempImages.length > 2 ? tempImages[2] : undefined,
      image4: tempImages.length > 3 ? tempImages[3] : undefined,
      image5: tempImages.length > 4 ? tempImages[4] : undefined,
    },
  };
  return newItem;
}

// Compare request to response
export function compareSchoolRequestToResponse(
  a?: SchoolRequest,
  b?: SchoolResponse
) {
  if (!a || !b) {
    return false;
  }
  const tempReq = formatSchoolFormToRequest(a);

  return (
    tempReq?.name === b.name &&
    tempReq?.type === b.type &&
    tempReq?.status === b.status &&
    tempReq?.favicon === b.favicon &&
    tempReq?.logo === b.logo &&
    tempReq?.logoWhite === b.logoWhite &&
    tempReq?.currency === b.currency &&
    tempReq?.paymentCount === b.paymentCount &&
    tempReq?.config?.websiteDomainName === b.config?.websiteDomainName &&
    tempReq?.config?.userEmailDomainName === b.config?.userEmailDomainName &&
    tempReq?.config?.supportEmail === b.config?.supportEmail &&
    tempReq?.config?.googleWorkspaceCredentials ===
      b.config?.googleWorkspaceCredentials &&
    tempReq?.config?.googleWorkspaceUserEmailDomain ===
      b.config?.googleWorkspaceUserEmailDomain &&
    tempReq?.config?.smsUserID === b.config?.smsUserID &&
    tempReq?.config?.whatsappToken === b.config?.whatsappToken &&
    tempReq?.config?.whatsappPhoneID === b.config?.whatsappPhoneID &&
    tempReq?.config?.telegramBotToken === b.config?.telegramBotToken &&
    tempReq?.config?.websiteTitle === b.config?.websiteTitle &&
    tempReq?.config?.websiteDescription === b.config?.websiteDescription &&
    tempReq?.config?.colorPrimary === b.config?.colorPrimary &&
    tempReq?.config?.colorPrimaryBg === b.config?.colorPrimaryBg &&
    tempReq?.config?.colorPrimaryBgHover === b.config?.colorPrimaryBgHover &&
    tempReq?.info?.fullName === b.info?.fullName &&
    tempReq?.info?.description === b.info?.description &&
    tempReq?.info?.motto === b.info?.motto &&
    tempReq?.info?.phoneNumber1 === b.info?.phoneNumber1 &&
    tempReq?.info?.phoneNumber2 === b.info?.phoneNumber2 &&
    tempReq?.info?.phoneNumber3 === b.info?.phoneNumber3 &&
    tempReq?.info?.email1 === b.info?.email1 &&
    tempReq?.info?.email2 === b.info?.email2 &&
    tempReq?.info?.email3 === b.info?.email3 &&
    tempReq?.info?.founder === b.info?.founder &&
    tempReq?.info?.foundedAt === b.info?.foundedAt &&
    tempReq?.info?.address === b.info?.address &&
    tempReq?.info?.locationLongitude === b.info?.locationLongitude &&
    tempReq?.info?.locationLatitude === b.info?.locationLatitude &&
    tempReq?.info?.socialMediaTelegram === b.info?.socialMediaTelegram &&
    tempReq?.info?.socialMediaWhasapp === b.info?.socialMediaWhasapp &&
    tempReq?.info?.socialMediaYoutube === b.info?.socialMediaYoutube &&
    tempReq?.info?.socialMediaTwitter === b.info?.socialMediaTwitter &&
    tempReq?.info?.socialMediaFacebook === b.info?.socialMediaFacebook &&
    tempReq?.info?.image1 === b.info?.image1 &&
    tempReq?.info?.image2 === b.info?.image2 &&
    tempReq?.info?.image3 === b.info?.image3 &&
    tempReq?.info?.image4 === b.info?.image4 &&
    tempReq?.info?.image5 === b.info?.image5
  );
}
