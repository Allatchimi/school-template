"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { antdTheme } from "@/ui/antd";

export interface DrawerMenuItemType {
  href?: string;
  label?: ReactNode;
  icon?: ReactNode;
}

interface DrawerDefaultMenuProps {
  extra?: ReactNode;
  menus?: DrawerMenuItemType[];
  onClose?: () => void;
}

export default function DrawerDefaultMenu(props: DrawerDefaultMenuProps) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-1">
        {props.menus?.map((item, index) => {
          return (
            <div className="w-full" key={index}>
              <Link
                key={index}
                href={item?.href ?? "/"}
                style={{
                  color: theme.colorText,
                  backgroundColor: theme.colorFillTertiary,
                  borderRadius: theme.borderRadius,
                }}
                className="w-full flex items-center text-base font-medium px-4 py-2 gap-4"
                onClick={props.onClose}
              >
                {item.icon}
                {item?.label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full">{props.extra}</div>
      </div>
    </div>
  );
}
