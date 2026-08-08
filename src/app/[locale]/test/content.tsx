"use client";

import { Title } from "@/ui/antd";

export default function PageContent() {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-12 p-4 lg:p-6">
        <Title level={2} className="w-auto text-center">
          Testing
        </Title>
        <div className="w-full"></div>
      </div>
    </>
  );
}
