export interface UploadRequest {
  tableName?: string | null;
  strategy?: string | null;
}

export interface DownloadRequest {
  tableName?: string | null;
  selection?: string | null;
}

// Format request
export function formatUploadFormToRequest(item?: UploadRequest) {
  if (!item) {
    return;
  }
  const newItem: UploadRequest = {
    ...item,
  };
  return newItem;
}

export function formatDownloadFormToRequest(item?: DownloadRequest) {
  if (!item) {
    return;
  }
  const newItem: DownloadRequest = {
    ...item,
  };
  return newItem;
}
