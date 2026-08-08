import { PATH_API_BASE_URL_INTERNAL } from "@/lib/constants/routes";
import { GET, POST, DELETE, PUT } from "@/lib/http/http";
import { SelectionRequest } from "@/types/http/base-request";
import { IDType } from "@/types/http/base-response";
import { GenericAbortSignal } from "axios";
import {
  ReportEntryRequest,
  formatReportEntryFormToRequest,
  ReportGradeRequest,
  ReportGradeListRequest,
  formatReportGradeFormToRequest,
  ReportConfigRequest,
  ReportConfigListRequest,
  formatReportConfigFormToRequest,
  ReportEntryListRequest,
  ReportTableListRequest,
  formatReportCorrespondenceFormToRequest,
  ReportCorrespondenceListRequest,
  ReportCorrespondenceRequest,
  ReportAverageListRequest,
} from "./request";
import {
  ReportEntryResponse,
  ReportEntryListResponse,
  ReportGradeResponse,
  ReportGradeListResponse,
  ReportConfigResponse,
  ReportConfigListResponse,
  ReportTableListResponse,
  ReportTableResponse,
  ReportCorrespondenceListResponse,
  ReportCorrespondenceResponse,
  ReportAverageListResponse,
  ReportAverageResponse,
} from "./response";

const PATH_GROUP = `${PATH_API_BASE_URL_INTERNAL}/schools/reports`;

// Report entry
export async function getReportEntry(id: IDType) {
  return GET<ReportEntryResponse, null>(`${PATH_GROUP}/entries/${id}`);
}
export async function getReportEntryList(
  params: ReportEntryListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ReportEntryListResponse, ReportEntryListRequest>(
    `${PATH_GROUP}/entries`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
export async function postReportEntry(item: ReportEntryRequest) {
  return POST<ReportEntryResponse, ReportEntryRequest>(
    `${PATH_GROUP}/entries`,
    formatReportEntryFormToRequest(item)
  );
}
export async function deleteReportEntry(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/entries/${id}`);
}
export async function deleteMultipleReportEntry(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/entries/multiple/delete`,
    {
      data: selection,
    }
  );
}

// Report grade
export async function getReportGrade(id: IDType) {
  return GET<ReportGradeResponse, null>(`${PATH_GROUP}/grades/${id}`);
}
export async function getReportGradeList(
  params: ReportGradeListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ReportGradeListResponse, ReportGradeListRequest>(
    `${PATH_GROUP}/grades`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
export async function postReportGrade(item: ReportGradeRequest) {
  return POST<ReportGradeResponse, ReportGradeRequest>(
    `${PATH_GROUP}/grades`,
    formatReportGradeFormToRequest(item)
  );
}
export async function updateReportGrade(item: ReportGradeRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ReportGradeResponse, ReportGradeRequest>(
    `${PATH_GROUP}/grades/${id}`,
    formatReportGradeFormToRequest(item)
  );
}
export async function deleteReportGrade(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/grades/${id}`);
}
export async function deleteMultipleReportGrade(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/grades/multiple/delete`,
    {
      data: selection,
    }
  );
}

// Report correspondence
export async function getReportCorrespondence(id: IDType) {
  return GET<ReportCorrespondenceResponse, null>(
    `${PATH_GROUP}/correspondences/${id}`
  );
}
export async function getReportCorrespondenceList(
  params: ReportCorrespondenceListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ReportCorrespondenceListResponse, ReportCorrespondenceListRequest>(
    `${PATH_GROUP}/correspondences`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
export async function postReportCorrespondence(
  item: ReportCorrespondenceRequest
) {
  return POST<ReportCorrespondenceResponse, ReportCorrespondenceRequest>(
    `${PATH_GROUP}/correspondences`,
    formatReportCorrespondenceFormToRequest(item)
  );
}
export async function updateReportCorrespondence(
  item: ReportCorrespondenceRequest
) {
  const id = item.id;
  item.id = undefined;
  return PUT<ReportCorrespondenceResponse, ReportCorrespondenceRequest>(
    `${PATH_GROUP}/correspondences/${id}`,
    formatReportCorrespondenceFormToRequest(item)
  );
}
export async function deleteReportCorrespondence(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/correspondences/${id}`);
}
export async function deleteMultipleReportCorrespondence(
  selection: SelectionRequest
) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/correspondences/multiple/delete`,
    {
      data: selection,
    }
  );
}

// Report config
export async function getReportConfig(id: IDType) {
  return GET<ReportConfigResponse, null>(`${PATH_GROUP}/configs/${id}`);
}
export async function getReportConfigList(
  params: ReportConfigListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ReportConfigListResponse, ReportConfigListRequest>(
    `${PATH_GROUP}/configs`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
export async function postReportConfig(item: ReportConfigRequest) {
  return POST<ReportConfigResponse, ReportConfigRequest>(
    `${PATH_GROUP}/configs`,
    formatReportConfigFormToRequest(item)
  );
}
export async function updateReportConfig(item: ReportConfigRequest) {
  const id = item.id;
  item.id = undefined;
  return PUT<ReportConfigResponse, ReportConfigRequest>(
    `${PATH_GROUP}/configs/${id}`,
    formatReportConfigFormToRequest(item)
  );
}
export async function deleteReportConfig(id: IDType) {
  return DELETE<number, null>(`${PATH_GROUP}/configs/${id}`);
}
export async function deleteMultipleReportConfig(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `${PATH_GROUP}/configs/multiple/delete`,
    {
      data: selection,
    }
  );
}

// Report average
export async function getReportAverage(id: IDType) {
  return GET<ReportAverageResponse, null>(`${PATH_GROUP}/averages/${id}`);
}
export async function getReportAverageList(
  params: ReportAverageListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ReportAverageListResponse, ReportAverageListRequest>(
    `${PATH_GROUP}/averages`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}

// Report table
export async function getReportTable(id: IDType) {
  return GET<ReportTableResponse, null>(`${PATH_GROUP}/tables/${id}`);
}
export async function getReportTableList(
  params: ReportTableListRequest,
  signal?: GenericAbortSignal
) {
  return GET<ReportTableListResponse, ReportTableListRequest>(
    `${PATH_GROUP}/tables`,
    {
      params: {
        ...params,
      },
      signal: signal,
    }
  );
}
