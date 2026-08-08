import { CollapseProps } from "antd";
import { Collapse, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SegmentFAQ() {
  // Next hooks
  const tPage = useTranslations("Pages.help.segmentFaq");

  const directorItems: CollapseProps["items"] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ].map((item) => {
    return {
      key: item.toString(),
      label: tPage(`director.row${item}.title`),
      children: <Text>{tPage(`director.row${item}.description`)}</Text>,
    };
  });

  return (
    <div className="w-full mt-6">
      <div className="w-full min-h-[600px] flex flex-col items-center gap-12">
        <Title level={3}>{tPage("title")}</Title>
        <div className="w-full flex flex-col gap-6">
          <Collapse
            accordion
            items={directorItems}
            size="large"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
