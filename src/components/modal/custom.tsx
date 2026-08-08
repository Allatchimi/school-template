import { Modal, Text } from "@/ui/antd";

interface CustomModalProps {
  icon?: React.ReactNode;
  title?: string;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  modalOpen?: boolean;
  maskClosable?: boolean;
  width?: string | number;
  destroyOnHidden?: boolean;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

export default function CustomModal(props: CustomModalProps) {
  return (
    <Modal
      title={
        <div className="w-auto flex items-center gap-2">
          {props.icon}
          <Text ellipsis>{props.title}</Text>
        </div>
      }
      okText={props.okText}
      cancelText={props.cancelText}
      onOk={props.onOk}
      onCancel={props.onCancel}
      open={props.modalOpen ?? undefined}
      centered={true}
      maskClosable={props.maskClosable ?? undefined}
      width={props.width ?? undefined}
      closeIcon={undefined}
      destroyOnHidden={props.destroyOnHidden ?? true}
      loading={props.loading}
    >
      {props.content}
    </Modal>
  );
}
