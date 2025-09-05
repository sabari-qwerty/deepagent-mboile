import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Devider } from "../common/devider";

interface prop {
  isNext: boolean;
  handleSelectAll: () => void;
  handleNext: () => void;
}

export const WorkSpaceHeader: FC<prop> = ({
  isNext,
  handleSelectAll,
  handleNext,
}) => {
  return (
    <View className="w-full py-4 pb-0 flex  items-center gap-y-4">
      <View className="w-[95%] mx-atuo flex-row justify-between items-center">
        <Text className="text-text-primary text-xl font-bold">Workspace</Text>

        {isNext && (
          <TouchableOpacity onPress={() => handleNext()}>
            <Text className="text-primary font-bold">Next</Text>
          </TouchableOpacity>
        )}

        {!isNext && (
          <TouchableOpacity onPress={() => handleSelectAll()}>
            <Text className="text-primary font-bold">Select All</Text>
          </TouchableOpacity>
        )}
      </View>
      <Devider />
    </View>
  );
};
