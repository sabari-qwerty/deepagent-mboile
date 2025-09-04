import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Devider } from "../common/devider";

export const WorkSpaceHeader: FC = () => {
  return (
    <View className="w-full py-4 flex  items-center gap-y-4">
      <View className="w-[95%] mx-atuo flex-row justify-between items-center">
        <Text className="text-text-primary text-xl font-bold">Workspace</Text>
        <TouchableOpacity className="p-2 ">
          <Text className="text-text-primary  font-bold">Select All</Text>
        </TouchableOpacity>
      </View>
      <Devider />
    </View>
  );
};
