import { MessagesResponse } from "@/types/type";
import { FC } from "react";
import { Text } from "react-native";
import { SystemMessage } from "./system.message";

export const TextRoute: FC<{ item: MessagesResponse }> = ({ item }) => {
  switch (item.sender) {
    case "agent":
    case "bot":
    case "user":
      return (
        <Text
          className={`${
            item.sender === "user" ? "text-text-primary" : "text-white"
          } text-sm `}
        >
          {item.blocks[0].text}
        </Text>
      );

    case "system":
      return <SystemMessage item={item} />;

    default:
      break;
  }

  return <></>;
};
