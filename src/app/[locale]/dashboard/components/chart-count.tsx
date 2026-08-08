"use client";

import { ReactNode } from "react";
import { antdTheme, Title, Text } from "@/ui/antd";

interface ItemCardType {
  icon: ReactNode;
  label: string;
  count: number;
}

export default function ChartCount(props: {
  loading?: boolean;
  data?: ItemCardType[];
}) {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
      {props.data?.map((item, index) => (
        <ItemCard key={index} item={item} loading={props.loading} />
      ))}
    </div>
  );
}

function ItemCard(props: { item?: ItemCardType; loading?: boolean }) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        backgroundColor: theme.colorPrimaryBg,
        borderRadius: theme.borderRadius,
      }}
      className="w-full h-32 flex flex-row items-center justify-center background-pattern-white gap-2 p-4"
    >
      <div
        style={{
          borderRadius: theme.borderRadius,
        }}
        className="w-auto h-auto flex flex-col items-center justify-center bg-white/50 p-2"
      >
        {props.item?.icon}
      </div>
      <div className="w-full flex flex-col">
        <Title
          level={3}
          ellipsis
          style={{
            color: theme.colorPrimary,
            margin: 0,
          }}
        >
          {props.loading === true ? "..." : props.item?.count}
        </Title>
        <Text ellipsis style={{ color: theme.colorPrimary }}>
          {props.loading === true ? "..." : props.item?.label}
        </Text>
      </div>
    </div>
  );
}
