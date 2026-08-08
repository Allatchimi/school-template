"use client";

import { Line } from "@/ui/antd-charts";
import { antdTheme } from "@/ui/antd";

export default function ChartLine(props: {
  title?: string;
  data?: any[];
  xField?: string;
  yField?: string;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const config = {
    data: props.data,
    autoFit: true,
    xAxis: {
      range: [0, 1],
    },
    xField: props.xField,
    yField: props.yField,
    colorField: props.xField,
    shapeField: "smooth",
    point: {
      shapeField: "circle",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 1,
      gradient: "y",
    },
    scale: {
      color: {
        range: [theme.colorPrimary],
      },
    },
  };

  return (
    <>
      <h1 className="w-full font-medium text-lg mx-4 my-3">{props.title}</h1>
      <Line {...config} />
    </>
  );
}
