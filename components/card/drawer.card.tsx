import { localWorkspace } from "@/types/type";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FallBackImage } from "../image/falback.image";

interface prop {
  item: localWorkspace;
  onPress: () => void;
}

export const DrawerCard: FC<prop> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className="w-full  flex-row items-center justify-between gap-x-4 p-2 py-3 border-b border-border-primary"
    >
      <View className="flex-row items-center gap-x-4">
        <View className={`w-10 h-10 rounded-md overflow-hidden `}>
          <FallBackImage imageUrl={item.imageUrl} />
        </View>
        <Text className="text-text-primary text-lg  font-bold ">
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
