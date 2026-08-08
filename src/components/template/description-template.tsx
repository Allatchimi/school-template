import ModalInfoFooter from "@/components/form-item/modal-info-footer";
import { DescriptionsProps } from "antd";
import { Descriptions, Divider } from "@/ui/antd";

export interface DescriptionTemplateProps<T extends object> {
  item?: T;
  returnDescriptionsNode?: (
    item?: T,
  ) => { title?: string; description?: DescriptionsProps["items"] }[];
  onClose?: () => void;
}
interface DescriptionTemplateContentProps<T extends object> {
  item?: T;
  content?: React.ReactNode;
  onClose?: () => void;
}

export default function DescriptionTemplate<T extends object>(
  props: DescriptionTemplateProps<T>,
) {
  const descriptions = props.returnDescriptionsNode
    ? props.returnDescriptionsNode(props.item)
    : [];
  return (
    <DescriptionTemplateContent
      item={props.item}
      content={descriptions?.map((item, index) => {
        return (
          <div key={index} className="w-full">
            {item.title && item.title.length > 0 && (
              <Divider plain>{item.title}</Divider>
            )}
            <Descriptions
              items={item.description}
              size={"small"}
              layout={"horizontal"}
              bordered={true}
              column={1}
            />
          </div>
        );
      })}
      onClose={props.onClose}
    />
  );
}

export function DescriptionTemplateContent<T extends object>(
  props: DescriptionTemplateContentProps<T>,
) {
  return (
    <div className="w-full flex flex-col gap-2.5 mt-4">
      {props.content}
      <ModalInfoFooter onClose={props.onClose} />
    </div>
  );
}
