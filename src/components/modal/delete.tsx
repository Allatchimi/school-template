"use client";

import { ExclamationCircleFilled } from "@ant-design/icons";
import CustomModal from "./custom";
import { useTranslations } from "next-intl";

interface DeleteModalProps {
  description?: string;
  modalOpen?: boolean;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

export default function DeleteModal(props: DeleteModalProps) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <CustomModal
      icon={<ExclamationCircleFilled style={{ color: "orange" }} />}
      title={tWords("delete")}
      content={<p>{props.description}</p>}
      okText={tWords("delete")}
      cancelText={tWords("cancel")}
      modalOpen={props.modalOpen}
      onOk={props.onOk}
      onCancel={props.onCancel}
      maskClosable={true}
      destroyOnHidden={true}
      loading={props.loading}
    />
  );
}
