"use client";

import { Column } from "@/ui/antd-charts";

export default function ChartColumn(props: {
  title?: string;
  data?: {
    school: string;
    value: number;
  }[];
}) {
  const config = {
    data: props.data,
    autoFit: true,
    xField: "type",
    yField: "value",
    colorField: "type",
    point: {
      shapeField: "circle",
      sizeField: -Infinity,
    },
    interaction: {
      elementSelect: false,
    },
    scale: {
      color: {
        // range: ["#15803d"],
        palette: "tableau10",
      },
    },
  };

  return (
    <>
      <h1 className="w-full font-medium text-lg mx-4 my-3">{props.title}</h1>
      <Column {...config} />
    </>
  );
}
