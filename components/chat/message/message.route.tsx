import { MessagesResponse } from "@/types/type";
import { FC } from "react";
import { Text } from "react-native";
import { TextRoute } from "./text.route";

export const MessageRoute: FC<{ item: MessagesResponse }> = ({ item }) => {
  if (item.blocks[0].text && item.blocks[0].text !== "") {
    return <TextRoute item={item} />;
  }
  switch (item.attachments[0].fileType) {
    case "image":
      return (
        <>
          <Text className="text-text-primary">Image</Text>
        </>
      );

    case "video":
      return (
        <>
          <Text className="text-text-primary">Video</Text>
        </>
      );

    case "document":
      return (
        <>
          <Text className="text-text-primary">Document</Text>
        </>
      );

    default:
      break;
  }
};
