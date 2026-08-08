import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, PUT, DELETE } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  ResultRequest,
  ResultListRequest,
  formatResultFormToRequest,
  ResultTableListRequest,
  ResultTableRequest,
} from "./request";
import {
  ResultResponse,
  ResultListResponse,
  ResultTableListResponse,
  ResultTableResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/results`;

// Result
export async function getResult(id: IDType) {
  return GET<ResultResponse, ResultRequest>(`${PATH_GROUP}/${id}`);
}
export async function getResultList(
  params: ResultListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ResultListResponse, ResultListRequest>(`${PATH_GROUP}`, {
    params: {
      ...params,
    },
    signal: signal,
  });
}
export async function postResult(item: ResultRequest) {
  return POST<ResultResponse, ResultRequest>(
    `${PATH_GROUP}`,
    formatResultFormToRequest(item)
  );
}
export async function updateResult(item: ResultRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ResultResponse, ResultRequest>(
    `${PATH_GROUP}/${id}`,
    formatResultFormToRequest(item)
  );
}
export async function deleteResult(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/${id}`);
}
export async function deleteMultipleResult(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(`${PATH_GROUP}/multiple/delete`, {
    data: selection,
  });
}

// Result table
export async function getResultTable(id: IDType) {
  return GET<ResultTableResponse, ResultTableRequest>(
    `${PATH_GROUP}/tables/${id}`
  );
}
export async function getResultTableList(
  params: ResultTableListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ResultTableListResponse, ResultTableListRequest>(
    `${PATH_GROUP}/tables`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
export async function postResultTable(item: ResultTableRequest) {
  return POST<ResultTableResponse, ResultTableRequest>(
    `${PATH_GROUP}/tables`,
    formatResultFormToRequest(item)
  );
}
export async function updateResultTable(item: ResultTableRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ResultTableResponse, ResultTableRequest>(
    `${PATH_GROUP}/tables/${id}`,
    formatResultFormToRequest(item)
  );
}
export async function deleteResultTable(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/tables/${id}`);
}
export async function deleteMultipleResultTable(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/tables/multiple/delete`,
    {
      data: selection,
    }
  );
}
