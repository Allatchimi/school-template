import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import {
  LevelDomainListResponse,
  LevelDomainResponse,
  LevelListResponse,
  LevelResponse,
} from "./response";
import {
  formatLevelDomainFormToRequest,
  formatLevelFormToRequest,
  LevelDomainListRequest,
  LevelDomainRequest,
  LevelListRequest,
  LevelRequest,
} from "./request";
import { IDType } from "@/types/http/base-response";
import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { SelectionRequest } from "@/types/http/base-request";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/university/levels`;

// Level
export async function getLevel(id: IDType) {
  return GET<LevelResponse, LevelRequest>(`${PATH_GROUP}/${id}`);
}
export async function getLevelList(
  params: LevelListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<LevelListResponse, LevelListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postLevel(item: LevelRequest) {
  return POST<LevelResponse, LevelRequest>(
    `${PATH_GROUP}`,
    formatLevelFormToRequest(item),
  );
}
export async function updateLevel(item: LevelRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<LevelResponse, LevelRequest>(
    `${PATH_GROUP}/${id}`,
    formatLevelFormToRequest(item),
  );
}
export async function deleteLevel(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleLevel(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Level domain
export async function getLevelDomain(id: IDType) {
  return GET<LevelDomainResponse, LevelDomainRequest>(
    `${PATH_GROUP}/domains/${id}`,
  );
}
export async function getLevelDomainList(
  params: LevelDomainListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<LevelDomainListResponse, LevelDomainListRequest>(
    `${PATH_GROUP}/domains`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function getLevelDomainListPublic(
  params: LevelDomainListRequest,
  signal?: GenericAbortSignal,
) {
  return GET<LevelDomainListResponse, LevelDomainListRequest>(
    `${PATH_GROUP}/domains/public`,
    {
      params: {
        ...params,
      },
      signal: signal,
    },
  );
}
export async function postLevelDomain(item: LevelDomainRequest) {
  return POST<LevelDomainResponse, LevelDomainRequest>(
    `${PATH_GROUP}/domains`,
    formatLevelDomainFormToRequest(item),
  );
}
export async function updateLevelDomain(item: LevelDomainRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<LevelDomainResponse, LevelDomainRequest>(
    `${PATH_GROUP}/domains/${id}`,
    formatLevelDomainFormToRequest(item),
  );
}
export async function deleteLevelDomain(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/domains/${id}`);
}

export async function deleteMultipleLevelDomain(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/domains/multiple/delete`,
    {
      data: selection,
    },
  );
}
