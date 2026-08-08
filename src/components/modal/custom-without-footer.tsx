import { Modal, Text } from "@/ui/antd";

interface CustomModalWithoutFooterProps {
  icon?: React.ReactNode;
  hideHead?: boolean;
  title?: string;
  content?: React.ReactNode;
  modalOpen?: boolean;
  maskClosable?: boolean;
  width?: string | number;
  destroyOnHidden?: boolean;
  afterOpenChange?: (visible: boolean) => void;
  onOk?: () => void;
  onCancel?: () => void;
}

export default function CustomModalWithoutFooter(
  props: CustomModalWithoutFooterProps
) {
  return (
    <Modal
      title={
        props.hideHead === true ? undefined : (
          <div className="w-auto flex items-center gap-2">
            {props.icon}
            <Text ellipsis>{props.title}</Text>
          </div>
        )
      }
      onOk={props.onOk}
      onCancel={props.onCancel}
      open={props.modalOpen ?? undefined}
      centered={true}
      maskClosable={props.maskClosable ?? undefined}
      width={props.width ?? undefined}
      footer={[]}
      closeIcon={undefined}
      closable={props.hideHead !== true}
      destroyOnHidden={props.destroyOnHidden ?? true}
      afterOpenChange={props.afterOpenChange}
    >
      {props.content}
    </Modal>
  );
}
