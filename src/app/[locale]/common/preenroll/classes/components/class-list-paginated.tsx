"use client";

import {
  ClassListResponse,
  ClassResponse,
} from "@/lib/api/school/highschool/class/response";
import ClassList from "@/components/card-list/school/highschool/class-list";
import { Pagination, Spin } from "@/ui/antd";
import ResultFailed from "@/components/result/result";

export default function ClassListPaginated(props: {
  loading?: boolean;
  queryKeyData?: string;
  loadingError?: boolean;
  data?: ClassListResponse;
  currentPage?: number;
  limit?: number;
  count?: number;
  onRefresh?: () => void;
  onPageChanged?: (page: number, limit: number) => void;
  onPreEnrollClicked?: (value?: ClassResponse) => void;
  onDescriptionRequested?: (value?: ClassResponse) => void;
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
            <ClassList
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
