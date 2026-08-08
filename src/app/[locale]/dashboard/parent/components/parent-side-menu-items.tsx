import {
  ItemType,
  MenuItemGroupType,
  MenuItemType,
} from "antd/es/menu/interface";
import CalendarIcon from "@/components/icon/material/calendar";
import CourseIcon from "@/components/icon/material/course";
import AssignmentIcon from "@/components/icon/material/assignment";
import FormatListIcon from "@/components/icon/material/format-list";
import ReportIcon from "@/components/icon/material/report";
import WorkspaceIcon from "@/components/icon/material/workspace";
import SubjectIcon from "@/components/icon/material/subject";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";

export default function ParentSideMenuItems(props: {
  schoolType?: string;
  basePath?: string;
  onClick?: (info: { key: string }) => void;
}): ItemType<MenuItemType>[] {
  // Next hooks
  const tWords = useTranslations("Words");

  const groupStart: MenuItemGroupType = {
    key: "grp-start",
    label: tWords("home"),
    type: "group",
    children: [
      {
        key: `${props.basePath ?? "/404"}/school/common/schedules`,
        icon: <CalendarIcon width={16} height={16} />,
        label: tWords("schedule"),
        onClick: props.onClick,
      },
    ],
  };

  const groupSchoolHighschool: MenuItemType[] = [
    {
      key: `${props.basePath ?? "/404"}/school/highschool/classes`,
      icon: <WorkspaceIcon width={16} height={16} />,
      label: tWords("classes"),
      onClick: props.onClick,
    },
    {
      key: `${props.basePath ?? "/404"}/school/highschool/classsubjects`,
      icon: <SubjectIcon width={16} height={16} />,
      label: tWords("subjects"),
      onClick: props.onClick,
    },
  ];

  const groupSchoolUniversity: MenuItemType[] = [
    {
      key: `${props.basePath ?? "/404"}/school/university/leveldomains`,
      icon: <WorkspaceIcon width={16} height={16} />,
      label: tWords("leveldomains"),
      onClick: props.onClick,
    },
    {
      key: `${props.basePath ?? "/404"}/school/university/units`,
      icon: <SubjectIcon width={16} height={16} />,
      label: tWords("units"),
      onClick: props.onClick,
    },
  ];

  const groupSchool: MenuItemGroupType = {
    key: "grp-school",
    label: tWords("school"),
    type: "group",
    children: [
      ...(props.schoolType === SCHOOL_TYPE_HIGHSCHOOL
        ? groupSchoolHighschool
        : props.schoolType === SCHOOL_TYPE_UNIVERSITY
          ? groupSchoolUniversity
          : []),
      {
        key: `${props.basePath ?? "/404"}/school/common/courses`,
        icon: <CourseIcon width={16} height={16} />,
        label: tWords("courses"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/exams`,
        icon: <AssignmentIcon width={16} height={16} />,
        label: tWords("exams"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/results`,
        icon: <FormatListIcon width={16} height={16} />,
        label: tWords("results"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/reports`,
        icon: <ReportIcon width={16} height={16} />,
        label: tWords("reports"),
        onClick: props.onClick,
      },
    ],
  };

  const menus: ItemType<MenuItemType>[] = [groupStart, groupSchool];

  return menus;
}
