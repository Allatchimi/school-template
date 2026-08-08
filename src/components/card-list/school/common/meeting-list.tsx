"use client";

import {
  MeetingListResponse,
  MeetingResponse,
} from "@/lib/api/school/common/meeting/response";
import MeetingCard from "./meeting-card";
import { CardListProps } from "../../card-list";
import CardListDisplayTemplate from "@/components/template/content-card-list/card-list-display-template";

export default function MeetingList(
  props: CardListProps<MeetingResponse, MeetingListResponse>
) {
  return (
    <CardListDisplayTemplate count={props.data?.data?.length}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom3xl:grid-cols-5 gap-2.5">
        {props.data?.data?.map((item, index) => {
          return (
            <MeetingCard
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
