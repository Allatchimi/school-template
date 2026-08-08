import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { POST } from "@/lib/http/http";
import { UploadRequest, DownloadRequest } from "./request";
import { UploadResponse, DownloadResponse } from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}`;

// Upload
export async function uploadData(params: UploadRequest) {
  return POST<UploadResponse, UploadRequest>(`${PATH_GROUP}/upload`, params);
}

// Download
export async function downloadData(params: DownloadRequest) {
  return POST<DownloadResponse, DownloadRequest>(
    `${PATH_GROUP}/download`,
    params,
  );
}
