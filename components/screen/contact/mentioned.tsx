import {
  ActionLocalContextProp,
  useActionLocal,
} from "@/components/provider/action.local";
import { conversationFilter } from "@/constants/filter";
import { conversationFilterType, converstationStatusType } from "@/types/type";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface prop {
  onPress: () => void;
  status: converstationStatusType;
  filter: conversationFilterType;
}

export const Mentioned: FC<prop> = ({ onPress, status, filter }) => {
  const { locked, runOnce } = useActionLocal() as ActionLocalContextProp;
  return (
    <View className={"w-[95%] mx-auto pt-4 "}>
      <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-[#06152D] font-semibold text-xs">
          {conversationFilter[filter].name} Conversations
        </Text>

        <TouchableOpacity
          onPress={() => {
            runOnce(async () => {
              onPress();
            });
          }}
          disabled={locked}
        >
          <Text className="text-[#2563EB] font-semibold text-xs">{status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
