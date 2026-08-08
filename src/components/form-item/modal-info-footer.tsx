"use client";

import { Button } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function ModalInfoFooter(props: { onClose?: () => void }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-full flex flex-wrap items-center justify-end gap-1 mt-4">
      <Button onClick={props.onClose} type="primary">
        {tWords("close")}
      </Button>
    </div>
  );
}
