import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { PreviewTime } from "@/lib/utils/time";
import { CustomContactData } from "@/types/type";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const Preivewheader = () => {
  const { title, fileExtension, url, timeStamp, fileType, sender } =
    useLocalSearchParams();

  const [userData, setUserData] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );

  console.log(userData);

  return (
    <View className="h-20 bg-[#0d1017] w-full  justify-center  items-center">
      <View className="w-[95%] mx-atuo flex-row justify-between  items-center">
        <Pressable
          className="flex-row gap-x-2 items-center "
          onPress={() => router.back()}
        >
          <Icons.BackArrowIcon color="#fff" />

          <View className="">
            <Text className="text-white text-lg">
              {sender === "agent" ? "YOU" : userData?.name}
            </Text>
            <Text className="text-white text-sm">
              {PreviewTime({ timeStamp: String(timeStamp) })}
            </Text>
          </View>
        </Pressable>

        <Pressable
          className=" py-3 px-3 rounded-full "
          onPress={() => {
            // openFile({
            //   fileUri: url as string,
            //   extions:
            //     (fileExtension as any) ??
            //     String(title).split(".").splice(-1)[0].trim(),
            // });
          }}
        >
          <Icons.DownloadIcon color="#fff" size={20} />
        </Pressable>
      </View>
    </View>
  );
};
