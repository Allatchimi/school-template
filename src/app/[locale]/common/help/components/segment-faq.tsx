import { CollapseProps } from "antd";
import { Collapse, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SegmentFAQ() {
  // Next hooks
  const tPage = useTranslations("Pages.helpSchool.segmentFaq");
  const tWords = useTranslations("Words");

  const teacherItems: CollapseProps["items"] = [1, 2, 3, 4, 5, 6, 7, 8].map(
    (item) => {
      return {
        key: item.toString(),
        label: tPage(`teacher.row${item}.title`),
        children: <Text>{tPage(`teacher.row${item}.description`)}</Text>,
      };
    }
  );

  const studentItems: CollapseProps["items"] = [1, 2, 3, 4, 5, 6, 7, 8].map(
    (item) => {
      return {
        key: item.toString(),
        label: tPage(`student.row${item}.title`),
        children: <Text>{tPage(`student.row${item}.description`)}</Text>,
      };
    }
  );

  const parentItems: CollapseProps["items"] = [1, 2, 3, 4, 5, 6, 7].map(
    (item) => {
      return {
        key: item.toString(),
        label: tPage(`teacher.row${item}.title`),
        children: <Text>{tPage(`teacher.row${item}.description`)}</Text>,
      };
    }
  );

  return (
    <div className="w-full mt-6">
      <div className="w-full min-h-[600px] flex flex-col items-center gap-12">
        <Title level={3}>{tPage("title")}</Title>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col">
            <Title level={4}>{tWords("teacher")}</Title>
            <Collapse
              accordion
              items={teacherItems}
              size="large"
              className="w-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <Title level={4}>{tWords("student")}</Title>
            <Collapse
              accordion
              items={studentItems}
              size="large"
              className="w-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <Title level={4}>{tWords("parent")}</Title>
            <Collapse
              accordion
              items={parentItems}
              size="large"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
