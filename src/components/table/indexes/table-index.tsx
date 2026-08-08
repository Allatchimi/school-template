import { Text } from "@/ui/antd";
import { TextProps } from "antd/es/typography/Text";

interface TableIndexProps extends TextProps {
  children?: React.ReactNode;
  maxWidth?: string | number;
}

export function TableIndexText(props: TableIndexProps) {
  return (
    <Text
      {...props}
      ellipsis={true}
      style={{
        maxWidth: props.maxWidth || "300px",
        display: "inline-block",
      }}
    >
      {props.children}
    </Text>
  );
}
