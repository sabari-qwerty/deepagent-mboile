import { useDrawer } from "@/hooks/useDrawer";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { localWorkspace } from "@/types/type";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FallBackImage } from "../image/falback.image";
import {
  ActionLocalContextProp,
  useActionLocal,
} from "../provider/action.local";

export const ContactHeader: FC = () => {
  const [activeWorkspace] = useStorage<localWorkspace>(
    StorageKeys.activeWorkspace
  );
  const { open } = useDrawer();

  const { locked, runOnce } = useActionLocal() as ActionLocalContextProp;

  return (
    <View className="w-full">
      <View className="w-[95%] mx-auto  pt-4    ">
        <Pressable
          className="flex flex-row gap-x-4 items-center"
          onPress={() => {
            runOnce(async () => {
              open();
            });
          }}
          disabled={locked}
        >
          <View
            className="w-[40px] h-[40px] bg-white p-2 rounded-lg "
            style={shadowStyles.shadowBox}
          >
            <FallBackImage imageUrl={String(activeWorkspace?.imageUrl)} />
          </View>
          <View>
            <Text className="text-text-primary text-xl font-bold ">
              {activeWorkspace?.name}
            </Text>
            {activeWorkspace?.shared && (
              <View className="w-[40px] h-[12px] rounded-xl  items-center justify-center bg-primary/80">
                <Text className="text-[8px] text-white font-bold">shared</Text>
              </View>
            )}
          </View>
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
