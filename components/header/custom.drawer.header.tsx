import { Icons } from "@/constants/icons";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Devider } from "../common/devider";

export const CustomDrawerHeader: FC = () => {
  return (
    <>
      <View className="py-4  justify-center items-center">
        <View className="w-[95%] mx-atuo flex-row justify-between items-center">
          <Text className="text-text-primary font-bold text-xl ">
            WorkSpace
          </Text>
          <TouchableOpacity>
            <View>
              <Icons.pluseCircle color="#06152d" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Devider />
    </>
  );
};
