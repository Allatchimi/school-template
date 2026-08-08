"use client";

import {
  CourseListResponse,
  CourseResponse,
} from "@/lib/api/school/common/course/response";
import CourseCard from "./course-card";
import { CardListProps } from "../../card-list";
import CardListDisplayTemplate from "@/components/template/content-card-list/card-list-display-template";

export default function CourseList(
  props: CardListProps<CourseResponse, CourseListResponse>
) {
  return (
    <CardListDisplayTemplate count={props.data?.data?.length}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom3xl:grid-cols-5 gap-2.5">
        {props.data?.data?.map((item, index) => {
          return (
            <CourseCard
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
