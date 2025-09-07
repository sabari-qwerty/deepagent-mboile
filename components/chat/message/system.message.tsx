import { MessagesResponse } from "@/types/type";
import { FC } from "react";
import { Text, View } from "react-native";

export const SystemMessage: FC<{ item: MessagesResponse }> = ({ item }) => {
  return (
    <View className="w-full  items-center justify-center ">
      <Text className="text-text-primary text-sm text-center">
        {item.blocks[0].text}
      </Text>
    </View>
  );
};
