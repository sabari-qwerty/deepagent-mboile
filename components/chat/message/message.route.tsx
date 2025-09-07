import { CuttomButtonForCahtBabule } from "@/components/button/CusttomButtonForChatBabule";
import {
  ChatScreenContext,
  ChatScreenContextProp,
} from "@/components/provider/chat.screen.provider";
import { MessagesResponse } from "@/types/type";
import { FC, useContext } from "react";
import { Text } from "react-native";
import { TextRoute } from "./text.route";

export const MessageRoute: FC<{ item: MessagesResponse }> = ({ item }) => {
  const { messages, setMessages } = useContext(
    ChatScreenContext
  ) as ChatScreenContextProp;
  if (item.blocks[0].text && item.blocks[0].text !== "") {
    return <TextRoute item={item} />;
  }
  switch (item.attachments[0].fileType) {
    case "image":
      return (
        <CuttomButtonForCahtBabule
          item={item}
          message={messages}
          setMessage={setMessages}
          url={"/preview"}
        >
          <Text className="text-text-primary">Image</Text>
        </CuttomButtonForCahtBabule>
      );

    case "video":
      return (
        <CuttomButtonForCahtBabule
          item={item}
          message={messages}
          setMessage={setMessages}
          url={"/preview"}
        >
          <Text className="text-text-primary">Video</Text>
        </CuttomButtonForCahtBabule>
      );

    case "document":
      return (
        <CuttomButtonForCahtBabule
          item={item}
          message={messages}
          setMessage={setMessages}
          url={"/preview"}
        >
          <Text className="text-text-primary">Document</Text>
        </CuttomButtonForCahtBabule>
      );

    default:
      break;
  }
};
