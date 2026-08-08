import {
  ItemType,
  MenuItemGroupType,
  MenuItemType,
} from "antd/es/menu/interface";
import CalendarIcon from "@/components/icon/material/calendar";
import CourseIcon from "@/components/icon/material/course";
import VideoCameraIcon from "@/components/icon/material/video-camera";
import AssignmentIcon from "@/components/icon/material/assignment";
import FormatListIcon from "@/components/icon/material/format-list";
import QuizIcon from "@/components/icon/material/quiz";
import HelpIcon from "@/components/icon/material/help";
import WorkspaceIcon from "@/components/icon/material/workspace";
import SubjectIcon from "@/components/icon/material/subject";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import StudentIcon from "@/components/icon/material/student";
import { useTranslations } from "next-intl";

export default function TeacherSideMenuItems(props: {
  schoolType?: string;
  basePath?: string;
  onClick?: (info: { key: string }) => void;
}): ItemType<MenuItemType>[] {
  // Next hooks
  const tWords = useTranslations("Words");

  const groupStart: MenuItemGroupType = {
    key: "grp-home",
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
      label: tWords("levelDomains"),
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
        key: `${props.basePath ?? "/404"}/school/common/meetings`,
        icon: <VideoCameraIcon width={16} height={16} />,
        label: tWords("meetings"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/quizzes`,
        icon: <QuizIcon width={16} height={16} />,
        label: tWords("quizzes"),
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
        key: `${props.basePath ?? "/404"}/school/common/students`,
        icon: <StudentIcon width={16} height={16} />,
        label: tWords("students"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/requests`,
        icon: <HelpIcon width={16} height={16} />,
        label: tWords("requests"),
        onClick: props.onClick,
      },
    ],
  };

  const menus: ItemType<MenuItemType>[] = [groupStart, groupSchool];

  return menus;
}
