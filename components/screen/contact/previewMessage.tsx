import truncateText from "@/lib/utils/truncateText";
import { LatestMessage } from "@/types/type";
import { FC } from "react";
import { Text } from "react-native";

export const PreviewMessage: FC<{ latestMessage: LatestMessage }> = ({
  latestMessage,
}) => {
  return (
    <Text className="text-[#06152D] text-xs font-medium">
      {latestMessage.attachments && latestMessage.attachments.length > 0
        ? "📎 File Attached"
        : truncateText({
            text: latestMessage.blocks[0].text ?? "User Joined",
            maxLength: 30,
          }) ?? "User Joined"}
    </Text>
  );
};
