import { UploadFile } from "antd";

export function castFileToStringUrl(
  files?: UploadFile[],
): (string | undefined)[] {
  if (files && files.length > 0) {
    const urls: (string | undefined)[] = [];
    files.forEach((element) => {
      urls.push(element?.response?.url ? element?.response?.url : element?.url);
    });
    return urls;
  }
  return [];
}

export function castStringUrlToFile(
  url: string,
  index?: number,
  label?: string,
): UploadFile {
  const tmpFile: UploadFile = {
    uid: (index ?? -1) > 0 ? `${index}` : `${url}`,
    name: (label?.length ?? 0) > 0 ? `${label} ${url}` : `${url}`,
    url: url,
    status: "done",
    percent: 100,
  };
  return tmpFile;
}
