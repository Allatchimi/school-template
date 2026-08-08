import { PATH_CDN_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import {
  ImageRequest,
  formatImageFormToRequest,
  DocumentRequest,
  formatDocumentFormToRequest,
} from "./request";
import { ImageResponse, DocumentResponse } from "./response";

const PATH_GROUP_IMAGES = `${PATH_CDN_URL_INTERNAL}/images`;
const PATH_GROUP_DOCUMENTS = `${PATH_CDN_URL_INTERNAL}/documents`;

// Images
export async function getImage(url: string) {
  return GET<ImageResponse, null>(`${PATH_GROUP_IMAGES}/${url}`);
}
export async function postImage(item: ImageRequest) {
  return POST<ImageResponse, ImageRequest>(
    `${PATH_GROUP_IMAGES}`,
    formatImageFormToRequest(item),
  );
}
export async function updateImage(url: string, item: ImageRequest) {
  return PUT<ImageResponse, ImageRequest>(
    `${PATH_GROUP_IMAGES}/${url}`,
    formatImageFormToRequest(item),
  );
}
export async function deleteImage(url: string) {
  return DELETE<number, null>(`${PATH_GROUP_IMAGES}/${url}`);
}
// Documents
export async function getDocument(url: string) {
  return GET<DocumentResponse, null>(`${PATH_GROUP_DOCUMENTS}/${url}`);
}
export async function postDocument(item: DocumentRequest) {
  return POST<DocumentResponse, DocumentRequest>(
    `${PATH_GROUP_DOCUMENTS}`,
    formatDocumentFormToRequest(item),
  );
}
export async function updateDocument(url: string, item: DocumentRequest) {
  return PUT<DocumentResponse, DocumentRequest>(
    `${PATH_GROUP_DOCUMENTS}/${url}`,
    formatDocumentFormToRequest(item),
  );
}
export async function deleteDocument(url: string) {
  return DELETE<number, null>(`${PATH_GROUP_DOCUMENTS}/${url}`);
}
