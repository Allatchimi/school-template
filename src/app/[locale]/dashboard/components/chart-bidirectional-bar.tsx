"use client";

import { BidirectionalBar } from "@/ui/antd-charts";

export default function ChartBidirectionalBar(props: {
  title?: string;
  data?: {
    school: string;
    boys: number;
    girls: number;
  }[];
}) {
  const config = {
    data: props.data,
    autoFit: true,
    layout: "horizontal",
    xField: "school",
    yField: ["boys", "girls"],
    colorField: "school",
    interaction: {
      elementSelect: false,
    },
    style: {
      fill: (item: any) => {
        return item.groupKey === "girls" ? "#f1a7b4" : "#25c5da";
      },
    },
  };

  return (
    <>
      <h1 className="w-full font-medium text-lg mx-4 my-3">{props.title}</h1>
      <BidirectionalBar {...config} />
    </>
  );
}
