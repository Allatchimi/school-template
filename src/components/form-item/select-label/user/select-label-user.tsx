import { UserResponse } from "@/lib/api/user/user/response";
import AvatarUser from "@/components/avatar/avatar-user";
import { Text } from "@/ui/antd";

export default function SelectLabelUser(props: {
  item?: UserResponse;
  moreDetails?: string;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <AvatarUser item={props.item ?? undefined} />
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.info?.firstName} {props.item?.info?.lastName}
        </Text>
        {(props.moreDetails?.length ?? 0) > 0 ? (
          <Text ellipsis type="secondary">
            {props.moreDetails}
          </Text>
        ) : undefined}
      </div>
    </div>
  );
}
