"use client";

import { ReactNode } from "react";
import StudentIcon from "@/components/icon/material/student";
import SupervisorIcon from "@/components/icon/material/supervisor";
import { SchoolConfig } from "@/config/school";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import TeacherIcon from "@/components/icon/material/teacher";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SegmentStart() {
  // Next hooks
  const tPage = useTranslations("Pages.helpSchool.segmentStart");
  const tWords = useTranslations("Words");

  const teacherItems = [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
    return {
      title: tPage(`teacher.row${item}.title`),
      description: tPage(`teacher.row${item}.description`),
    };
  });

  const studentItems = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
    return {
      title: tPage(`student.row${item}.title`),
      description: tPage(`student.row${item}.description`),
    };
  });

  const parentItems = [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
    return {
      title: tPage(`parent.row${item}.title`),
      description: tPage(`parent.row${item}.description`),
    };
  });
  return (
    <div className="w-full mt-6">
      <div className="w-full min-h-[600px] flex flex-col items-center gap-8">
        <Title level={3} className="text-center">
          {tPage("title")}
        </Title>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-4">
          <Card
            title={tWords("teacher")}
            descriptions={teacherItems}
            icon={<TeacherIcon />}
          />
          <Card
            title={tWords("student")}
            descriptions={studentItems}
            icon={<StudentIcon />}
            action={
              <Link
                href={
                  SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
                    ? "/common/preenroll/level-domains"
                    : "/common/preenroll/classes"
                }
              >
                <Button type="primary" size="large" className="w-full">
                  {tWords("browse")}{" "}
                  {SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
                    ? tWords("levelDomains")
                    : tWords("classes")}
                </Button>
              </Link>
            }
          />
          <Card
            title={tWords("parent")}
            descriptions={parentItems}
            icon={<SupervisorIcon />}
          />
        </div>
      </div>
    </div>
  );
}

function Card(props: {
  title: string;
  descriptions: { title?: string; description: string }[];
  icon: ReactNode;
  action?: ReactNode;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        backgroundColor: theme.colorFillQuaternary,
        borderRadius: theme.borderRadius,
        borderWidth: "0.5px",
        borderColor: theme.colorBorder,
      }}
      className="w-full h-full flex flex-col gap-4 pb-4 hover:shadow-lg transition-all"
    >
      <div
        style={{
          backgroundColor: theme.colorPrimaryBg,
          borderTopLeftRadius: theme.borderRadius,
          borderTopRightRadius: theme.borderRadius,
        }}
        className="w-full flex gap-2 px-4 py-2"
      >
        <Title level={5} ellipsis className="w-full flex items-center gap-2">
          {props.icon} {props.title}
        </Title>
      </div>

      <div className="w-full h-full flex flex-col justify-between px-4 gap-6">
        <div className="w-full flex flex-col gap-3">
          {props.descriptions.map((description, index) => (
            <div key={index} className="w-full flex flex-col">
              <Text style={{ fontSize: theme.fontSizeLG }}>
                <span className="font-semibold">{description.title}</span>
              </Text>
              <Text>
                <span className="opacity-75">{description.description}</span>
              </Text>
            </div>
          ))}
        </div>
        <div>{props.action}</div>
      </div>
    </div>
  );
}
