"use client";

import {
  ItemType,
  MenuItemGroupType,
  MenuItemType,
  SubMenuType,
} from "antd/es/menu/interface";
import MonitoringIcon from "@/components/icon/material/monitoring";
import FlagIcon from "@/components/icon/material/flag";
import ManageAccountsIcon from "@/components/icon/material/manage-accounts";
import DomainIcon from "@/components/icon/material/domain";
import HomeWorkIcon from "@/components/icon/material/home-work";
import CalendarIcon from "@/components/icon/material/calendar";
import CourseIcon from "@/components/icon/material/course";
import VideoCameraIcon from "@/components/icon/material/video-camera";
import AssignmentIcon from "@/components/icon/material/assignment";
import FormatListIcon from "@/components/icon/material/format-list";
import ReportIcon from "@/components/icon/material/report";
import QuizIcon from "@/components/icon/material/quiz";
import HelpIcon from "@/components/icon/material/help";
import AdmissionIcon from "@/components/icon/material/admission";
import PaymentIcon from "@/components/icon/material/payment";
import EventIcon from "@/components/icon/material/event";
import ShieldIcon from "@/components/icon/material/shield";
import PersonIcon from "@/components/icon/material/person";
import GroupIcon from "@/components/icon/material/group";
import CampaignIcon from "@/components/icon/material/campaign";
import SupportAgentIcon from "@/components/icon/material/support-agent";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import SupervisorIcon from "@/components/icon/material/supervisor";
import TeacherIcon from "@/components/icon/material/teacher";
import { useTranslations } from "next-intl";

export default function AdminSideMenuItems(props: {
  isAdmin?: boolean;
  schoolType?: string;
  basePath?: string;
  onClick?: (info: { key: string }) => void;
}): ItemType<MenuItemType>[] {
  // Next hooks
  const tWords = useTranslations("Words");

  const groupStart: MenuItemGroupType = {
    key: "group-home",
    label: tWords("home"),
    type: "group",
    children: [
      {
        key: `${props.basePath ?? "/404"}/home`,
        icon: <MonitoringIcon width={16} height={16} />,
        label: tWords("statistics"),
        onClick: props.onClick,
      },
    ],
  };

  const groupSchoolHighschool: SubMenuType = {
    key: "group-school-highschool",
    label: tWords("highschool"),
    icon: <HomeWorkIcon width={16} height={16} />,
    children: [
      {
        key: `${props.basePath ?? "/404"}/school/highschool/quarters`,
        label: tWords("quarters"),

        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/highschool/sequences`,
        label: tWords("sequences"),

        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/highschool/sections`,
        label: tWords("sections"),

        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/highschool/specialties`,
        label: tWords("specialties"),

        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/highschool/subjects`,
        label: tWords("subjects"),

        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/highschool/classes`,
        label: tWords("classes"),

        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/highschool/class-subjects`,
        label: tWords("classSubjects"),

        onClick: props.onClick,
      },
    ],
  };

  const groupSchoolUniversity: SubMenuType = {
    key: "group-school-university",
    label: tWords("university"),
    icon: <DomainIcon width={16} height={16} />,
    children: [
      {
        key: `${props.basePath ?? "/404"}/school/university/semesters`,
        label: tWords("semesters"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/university/faculties`,
        label: tWords("faculties"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/university/departments`,
        label: tWords("departments"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/university/domains`,
        label: tWords("domains"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/university/levels`,
        label: tWords("levels"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/university/level-domains`,
        label: tWords("levelDomains"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/university/units`,
        label: tWords("units"),
        onClick: props.onClick,
      },
    ],
  };

  const groupSchool: MenuItemGroupType = {
    key: "group-schools",
    label: tWords("school"),
    type: "group",
    children: [
      ...(props.isAdmin === true
        ? [
            {
              key: `${props.basePath ?? "/404"}/school/common/schools`,
              icon: <FlagIcon width={16} height={16} />,
              label: tWords("schools"),
              onClick: props.onClick,
            },
          ]
        : []),
      {
        key: "group-school-users",
        label: tWords("users"),
        icon: <ManageAccountsIcon width={16} height={16} />,
        children: [
          ...(props.isAdmin === true
            ? [
                {
                  key: `${props.basePath ?? "/404"}/school/common/directors`,
                  label: tWords("directors"),
                  onClick: props.onClick,
                },
              ]
            : []),
          {
            key: `${props.basePath ?? "/404"}/school/common/managers`,
            label: tWords("managers"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/teachers`,
            label: tWords("teachers"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/students`,
            label: tWords("students"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/parents`,
            label: tWords("parents"),
            onClick: props.onClick,
          },
        ],
      },
      ...(props.isAdmin === true
        ? [groupSchoolHighschool, groupSchoolUniversity]
        : props.schoolType === SCHOOL_TYPE_HIGHSCHOOL
          ? [groupSchoolHighschool]
          : props.schoolType === SCHOOL_TYPE_UNIVERSITY
            ? [groupSchoolUniversity]
            : []),
      {
        key: `${props.basePath ?? "/404"}/school/common/years`,
        icon: <EventIcon width={16} height={16} />,
        label: tWords("years"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/teachers/classsubjectunits`,
        icon: <TeacherIcon width={16} height={16} />,
        label: tWords("teachings"),
        onClick: props.onClick,
      },
      {
        key: "group-school-schedules",
        label: tWords("schedules"),
        icon: <CalendarIcon width={16} height={16} />,
        children: [
          {
            key: `${props.basePath ?? "/404"}/school/common/schedules/entries`,
            label: tWords("entries"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/schedules/weeklyview`,
            label: tWords("weeklyView"),
            onClick: props.onClick,
          },
        ],
      },
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
        key: "group-school-exams",
        label: tWords("exams"),
        icon: <AssignmentIcon width={16} height={16} />,
        children: [
          {
            key: `${props.basePath ?? "/404"}/school/common/exams/types`,
            label: tWords("types"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/exams/entries`,
            label: tWords("entries"),
            onClick: props.onClick,
          },
        ],
      },
      {
        key: "group-school-results",
        label: tWords("results"),
        icon: <FormatListIcon width={16} height={16} />,
        children: [
          {
            key: `${props.basePath ?? "/404"}/school/common/results/entries`,
            label: tWords("entries"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/results/tables`,
            label: tWords("tables"),
            onClick: props.onClick,
          },
        ],
      },
      {
        key: "group-school-reports",
        label: tWords("reports"),
        icon: <ReportIcon width={16} height={16} />,
        children: [
          {
            key: `${props.basePath ?? "/404"}/school/common/reports/config`,
            label: tWords("configuration"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/reports/grades`,
            label: tWords("grades"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/reports/correspondences`,
            label: tWords("correspondences"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/reports/entries`,
            label: tWords("entries"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/reports/averages`,
            label: tWords("averages"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/reports/tables`,
            label: tWords("tables"),
            onClick: props.onClick,
          },
        ],
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/requests`,
        icon: <HelpIcon width={16} height={16} />,
        label: tWords("requests"),
        onClick: props.onClick,
      },
      {
        key: "group-school-enrolls",
        label: tWords("enrolls"),
        icon: <AdmissionIcon width={16} height={16} />,
        children: [
          {
            key: `${props.basePath ?? "/404"}/school/common/enrolls/pre`,
            label: tWords("preEnrolls"),
            onClick: props.onClick,
          },
          {
            key: `${props.basePath ?? "/404"}/school/common/enrolls/entries`,
            label: tWords("entries"),
            onClick: props.onClick,
          },
        ],
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/payments`,
        icon: <PaymentIcon width={16} height={16} />,
        label: tWords("payments"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/school/common/parents/students`,
        icon: <SupervisorIcon width={16} height={16} />,
        label: tWords("parentings"),
        onClick: props.onClick,
      },
    ],
  };

  const groupUsersRoles: MenuItemGroupType = {
    key: "group-users-roles",
    label: tWords("users"),
    type: "group",
    children: [
      {
        key: `${props.basePath ?? "/404"}/users/roles`,
        icon: <GroupIcon width={16} height={16} />,
        label: tWords("roles"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/users/permissions`,
        icon: <ShieldIcon width={16} height={16} />,
        label: tWords("permissions"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/users/users`,
        icon: <PersonIcon width={16} height={16} />,
        label: tWords("entries"),
        onClick: props.onClick,
      },
    ],
  };

  const groupOthers: MenuItemGroupType = {
    key: "group-others",
    label: tWords("others"),
    type: "group",
    children: [
      {
        key: `${props.basePath ?? "/404"}/others/communications`,
        icon: <CampaignIcon width={16} height={16} />,
        label: tWords("communications"),
        onClick: props.onClick,
      },
      {
        key: `${props.basePath ?? "/404"}/others/contacts`,
        icon: <SupportAgentIcon width={16} height={16} />,
        label: tWords("helpCenter"),
        onClick: props.onClick,
      },
    ],
  };

  const menus: ItemType<MenuItemType>[] = [
    groupStart,
    groupSchool,
    ...(props.isAdmin === true ? [groupUsersRoles] : []),
    groupOthers,
  ];

  return menus;
}
