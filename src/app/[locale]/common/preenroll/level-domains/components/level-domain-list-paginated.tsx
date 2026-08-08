"use client";

import {
  LevelDomainListResponse,
  LevelDomainResponse,
} from "@/lib/api/school/university/level/response";
import LevelDomainList from "@/components/card-list/school/university/level-domain-list";
import { Pagination, Spin } from "@/ui/antd";
import ResultFailed from "@/components/result/result";

export default function LevelDomainListPaginated(props: {
  loading?: boolean;
  queryKeyData?: string;
  loadingError?: boolean;
  data?: LevelDomainListResponse;
  currentPage?: number;
  limit?: number;
  count?: number;
  onRefresh?: () => void;
  onPageChanged?: (page: number, limit: number) => void;
  onPreEnrollClicked?: (value?: LevelDomainResponse) => void;
  onDescriptionRequested?: (value?: LevelDomainResponse) => void;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full min-h-[720px]">
        {props.loadingError === true ? (
          <div className="w-full flex items-center justify-center">
            <ResultFailed onRefresh={props.onRefresh} />
          </div>
        ) : (
          <Spin spinning={props.loading}>
            <LevelDomainList
              data={props.data}
              isPublic={true}
              onDescriptionRequested={props.onDescriptionRequested}
              onPreEnrollClicked={props.onPreEnrollClicked}
            />
          </Spin>
        )}
      </div>
      <div className="w-full mt-6">
        <Pagination
          showQuickJumper
          responsive
          align="center"
          disabled={props.loading ?? false}
          current={props.currentPage ?? 1}
          pageSize={props.limit ?? 20}
          total={props.count ?? 0}
          onChange={props.onPageChanged}
        />
      </div>
    </div>
  );
}
