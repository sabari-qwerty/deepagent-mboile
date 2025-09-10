import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Devider } from "../common/devider";
import { useSocket } from "../provider/socket";

interface prop {
  close: () => void;
}

export const CustomDrawerHeader: FC<prop> = ({ close }) => {



  return (
    <>
      <View className="py-4  justify-center items-center">
        <View className="w-[95%] mx-atuo flex-row justify-between items-center">
          <Text className="text-text-primary font-bold text-xl ">
            WorkSpace
          </Text>


          <TouchableOpacity
            onPress={() => {
              router.replace("/(app)/(session)/workspace");
              close();
            }}
          >
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
