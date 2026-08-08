import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { UnitListResponse, UnitResponse } from "./response";
import { UnitListRequest, UnitRequest } from "./request";
import { IDType } from "@/types/http/base-response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { formatUnitFormToRequest } from "./request";
import { SelectionRequest } from "@/types/http/base-request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/university/units`;

// Unit
export async function getUnit(id: IDType) {
  return GET<UnitResponse, UnitRequest>(`${PATH_GROUP}/${id}`);
}
export async function getUnitList(
  params: UnitListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<UnitListResponse, UnitListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postUnit(item: UnitRequest) {
  return POST<UnitResponse, UnitRequest>(
    `${PATH_GROUP}`,
    formatUnitFormToRequest(item),
  );
}
export async function updateUnit(item: UnitRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<UnitResponse, UnitRequest>(
    `${PATH_GROUP}/${id}`,
    formatUnitFormToRequest(item),
  );
}
export async function deleteUnit(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleUnit(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}
