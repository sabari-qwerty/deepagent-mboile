import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { CustomContactData } from "@/types/type";
import { router, useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ConatactAvatar } from "../avater/conact.avater";
import { ChatScreenPopover } from "../popover";
import { shadowStyles } from "./contact.header";

interface prop {
  isNavigate: boolean;
}

export const ChatHeader: FC<prop> = ({ isNavigate }) => {
  const [userData] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );

  const { sessionId } = useLocalSearchParams();

  return (
    <View className="w-full  bg-white">
      {userData === null && (
        <View className="w-12 h-12 bg-white rounded-full"></View>
      )}

      {userData !== null && (
        <View className="w-full" style={shadowStyles.shadowBox}>
          <View className="w-[95%] mx-auto flex-row gap-x-2 py-3 ">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row gap-x-1 items-center  px-2"
            >
              <Icons.LeftArrow />

              <ConatactAvatar
                imageId={userData?.imageId ?? ""}
                platform={userData?.platform ?? "whatsapp"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (isNavigate) {
                  router.push({
                    pathname: "/(app)/(session)/profile",
                    params: {
                      sessionId,
                    },
                  });
                }
              }}
              className="flex-1 h-12  "
              disabled={false}
            >
              <View className="w-full h-full  justify-center">
                <Text className="text-lg text-text-primary capitalize ">
                  {userData?.name}
                </Text>

                {false && (
                  <Text className="text-text-secondary text-sm">
                    Typing ....
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <View className="w-8  justify-center items-center ">
              <ChatScreenPopover />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
