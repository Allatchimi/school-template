import { Empty } from "@/ui/antd";

interface CardListDisplayTemplateProps {
  count?: number;
  children?: React.ReactNode;
}

export default function CardListDisplayTemplate(
  props: CardListDisplayTemplateProps,
) {
  return (props.count ?? 0) > 0 ? (
    props.children
  ) : (
    <div className="w-full min-h-64 flex items-center justify-center">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
}
