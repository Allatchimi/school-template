import { GET } from "@/lib/http/http";
import { IDType } from "@/types/http/base-response";
import { InitializeResponse } from "./response";

// Initialize
export async function getInitializeServerSide(
  token?: string,
  schoolID?: IDType,
  schoolApiKey?: string
) {
  const tmpPath = `${process.env.API_BASE_URL}/initialize`;
  return GET<InitializeResponse, null>(`${tmpPath}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-School-Id": schoolID,
      "X-School-Api-Key": schoolApiKey,
    },
  });
}
