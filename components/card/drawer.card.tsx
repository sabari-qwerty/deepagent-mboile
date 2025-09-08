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
        <View></View>

        <View>
          <Text className="text-text-primary text-xl font-bold ">
            {item.name}
          </Text>
          {item.shared && (
            <View className="w-[40px] h-[12px] rounded-xl  items-center justify-center bg-primary/80">
              <Text className="text-[8px] text-white font-bold">shared</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
