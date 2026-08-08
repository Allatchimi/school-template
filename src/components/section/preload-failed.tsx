"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { Button, Result } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function PreloadFailed() {
  const handleRetry = () => {
    window.location.reload();
  };
  // Next hooks
  const tComponents = useTranslations(
    "Components.section.preloadFailed"
  );
  const tWords = useTranslations("Words");

  return (
    <CustomContainerFullHeight>
      <div className="w-full full flex items-center justify-center">
        <Result
          status="warning"
          title={tComponents("title")}
          subTitle={tComponents("subtitle")}
          extra={<Button onClick={handleRetry}>{tWords("retry")}</Button>}
        />
      </div>
    </CustomContainerFullHeight>
  );
}
