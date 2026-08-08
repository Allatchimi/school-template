"use client";

import ClassCard from "./class-card";
import {
  ClassListResponse,
  ClassResponse,
} from "@/lib/api/school/highschool/class/response";
import { CardListProps } from "../../card-list";
import CardListDisplayTemplate from "@/components/template/content-card-list/card-list-display-template";

export default function ClassList(
  props: {
    isPublic?: boolean;
    onPreEnrollClicked?: (value?: ClassResponse) => void;
  } & CardListProps<ClassResponse, ClassListResponse>
) {
  return (
    <CardListDisplayTemplate count={props.data?.data?.length}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom3xl:grid-cols-5 gap-2.5">
        {props.data?.data?.map((item, index) => {
          return (
            <ClassCard
              key={index}
              item={item}
              canUpdate={props.canUpdate}
              canDelete={props.canDelete}
              isPublic={props.isPublic}
              hideDropdownButtonMore={props.hideDropdownButtonMore}
              onPreEnrollClicked={props.onPreEnrollClicked}
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
