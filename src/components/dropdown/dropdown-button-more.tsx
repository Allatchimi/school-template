"use client";

import { MoreOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Button, Dropdown } from "@/ui/antd";

export interface DropdownButtonMoreProps {
  items?: MenuProps["items"];
}

export default function DropdownButtonMore(props: DropdownButtonMoreProps) {
  return (
    <Dropdown menu={{ items: props.items }} trigger={["click"]}>
      <Button
        color="default"
        variant="text"
        shape="circle"
        icon={<MoreOutlined />}
      />
    </Dropdown>
  );
}
