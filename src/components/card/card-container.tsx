"use client";

import { antdTheme } from "@/ui/antd";

export default function CardContainer(props: {
  padding?: string;
  children?: React.ReactNode;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        backgroundColor: theme.colorBgContainer,
        borderRadius: theme.borderRadius,
        borderWidth: "0.5px",
        borderColor: theme.colorBorder,
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
        padding: props.padding || "32px",
      }}
      className="w-full h-full flex flex-col gap-3 hover:scale-[1.02] transition-all duration-150 ease-in-out"
    >
      {props.children}
    </div>
  );
}
