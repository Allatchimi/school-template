import { BaseRequest } from "@/types/http/base-request";

export interface ImageRequest extends BaseRequest {
  width?: number | null;
  height?: number | null;
  quality?: number | null;

  image?: File | null;
}

export interface DocumentRequest extends BaseRequest {
  document?: File | null;
}

// Format request
export function formatImageFormToRequest(item?: ImageRequest) {
  if (!item) {
    return;
  }
  const newItem: ImageRequest = {
    ...item,
    width: parseInt(`${item.width}`),
    height: parseInt(`${item.height}`),
    quality: parseInt(`${item.quality}`),
  };
  return newItem;
}

export function formatDocumentFormToRequest(item?: DocumentRequest) {
  if (!item) {
    return;
  }
  const newItem: DocumentRequest = {
    ...item,
  };
  return newItem;
}
