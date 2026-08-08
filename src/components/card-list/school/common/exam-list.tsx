"use client";

import {
  ExamListResponse,
  ExamResponse,
} from "@/lib/api/school/common/exam/response";
import ExamCard from "./exam-card";
import { CardListProps } from "../../card-list";
import CardListDisplayTemplate from "@/components/template/content-card-list/card-list-display-template";

export default function ExamList(
  props: CardListProps<ExamResponse, ExamListResponse>,
) {
  return (
    <CardListDisplayTemplate count={props.data?.data?.length}>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2.5">
        {props.data?.data?.map((item, index) => {
          return (
            <ExamCard
              key={index}
              item={item}
              canUpdate={props.canUpdate}
              canDelete={props.canDelete}
              hideDropdownButtonMore={props.hideDropdownButtonMore}
              onDescriptionRequested={props.onDescriptionRequested}
              onUpdateRequested={props.onUpdateRequested}
              onDeleteRequested={props.onDeleteRequested}
            />
          );
        })}
      </div>
    </CardListDisplayTemplate>
  );
}
