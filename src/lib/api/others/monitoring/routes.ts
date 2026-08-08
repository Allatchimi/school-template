import { GET } from "@/lib/http/http";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { MonitoringListRequest } from "./request";
import { MonitoringListResponse } from "./response";
import { GenericAbortSignal } from "axios";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/monitorings`;

// Monitoring
export async function getMonitoringList(
  params: MonitoringListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<MonitoringListResponse, MonitoringListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
