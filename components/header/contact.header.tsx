import { useDrawer } from "@/hooks/useDrawer";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { localWorkspace } from "@/types/type";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FallBackImage } from "../image/falback.image";

export const ContactHeader: FC = () => {
  const [activeWorkspace] = useStorage<localWorkspace>(
    StorageKeys.activeWorkspace
  );
  const { open } = useDrawer();

  return (
    <View className="w-full">
      <View className="w-[95%] mx-auto  pt-4    ">
        <Pressable
          className="flex flex-row gap-x-4 items-center"
          onPress={open}
        >
          <View
            className="w-[40px] h-[40px] bg-white p-2 rounded-lg "
            style={shadowStyles.shadowBox}
          >
            <FallBackImage imageUrl={String(activeWorkspace?.imageUrl)} />
          </View>
          <Text className="text-2xl text-[#07142F] font-bold ">
            {activeWorkspace?.name}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const shadowStyles = StyleSheet.create({
  shadowBox: {
    backgroundColor: "white",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,

    // Android shadow
    elevation: 5,
  },
});
