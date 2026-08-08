import { BaseResponse } from "@/types/http/base-response";

export interface UploadResponse extends BaseResponse {
  message?: string | null;
}

export interface DownloadResponse extends BaseResponse {
  url?: string | null;
}
