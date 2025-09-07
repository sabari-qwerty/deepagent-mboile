import {
  ChatScreenContext,
  ChatScreenContextProp,
} from "@/components/provider/chat.screen.provider";
import { Icons } from "@/constants/icons";
import truncateText from "@/lib/utils/truncateText";
import { MessagesResponse } from "@/types/type";
import { FC, useContext } from "react";
import { Text, View } from "react-native";

export const DocumentBabule: FC<{ item: MessagesResponse }> = ({ item }) => {
  const { messages, setMessages } = useContext(
    ChatScreenContext
  ) as ChatScreenContextProp;

  return (
    <>
      <View
        className={`w-full h-[80px] ${
          item.sender === "user" ? "bg-primary/10" : "bg-white/10"
        } rounded-t-[8px] flex-row items-center justify-center `}
      >
        <Icons.PDFIcon
          color={item.sender === "user" ? "#06152d" : "white"}
          size={200}
        />
      </View>
      <View className={`w-full  px-2 py-1`}>
        <Text
          className={`${
            item.sender === "user" ? "text-text-primary" : "text-white"
          }`}
        >
          {truncateText({
            text: String(item.attachments[0].title),
            maxLength: 20,
          })}
          {truncateText({
            text: String(item.attachments[0].title),
            maxLength: 20,
          }).endsWith(".pdf")
            ? ""
            : ".pdf"}
        </Text>

        <View className="flex-row items-center   pt-[2px] ">
          <Text
            className={`text-[10px]  ${
              item.sender === "user" ? "text-text-primary" : "text-white"
            }`}
          >
            {item.attachments[0].fileType}
          </Text>
          <View
            className={`w-[2px] h-[2px] rounded ${
              item.sender === "user" ? "bg-text-primary" : "bg-white"
            } self-center mx-1`}
          />
          <Text
            className={`text-[10px] ${
              item.sender === "user" ? "text-text-primary" : "text-white"
            }`}
          >
            {item.attachments[0].fileExtension || "pdf"}
          </Text>
        </View>
      </View>
    </>
  );
};
