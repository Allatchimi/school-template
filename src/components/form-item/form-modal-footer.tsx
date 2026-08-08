"use client";

import { FormItem, Button } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function FormModalFooter(props: {
  loading?: boolean;
  canSubmit?: boolean;
  onCancel?: () => void;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-full flex flex-wrap items-center justify-end gap-1 mt-4">
      <Button disabled={props.loading} onClick={props.onCancel}>
        {tWords("cancel")}
      </Button>
      <FormItem noStyle>
        <Button
          disabled={props.canSubmit != true}
          loading={props.loading}
          type="primary"
          htmlType="submit"
        >
          {tWords("submit")}
        </Button>
      </FormItem>
    </div>
  );
}
