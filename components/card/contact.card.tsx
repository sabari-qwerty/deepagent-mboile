import { timeStampFormatter } from "@/lib/utils/time";
import { ContactData } from "@/types/type";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ConatactAvatar } from "../avater/conact.avater";
import { PreviewMessage } from "../screen/contact/previewMessage";

interface prop {
  item: ContactData;
  onPress: () => void;
}

export const ConatactCard: FC<prop> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row gap-x-4  my-2 h-12  items-center space-x-4"
    >
      <ConatactAvatar
        imageId={item.userData.imageId ?? "PxYMze1T"}
        platform={item.platform}
      />
      <View className="flex-1 w-full h-full justify-between py-0.5 flex-row">
        <View>
          <Text className="text-[#06152D] font-bold text-md text-left items-start capitalize">
            {item?.userData?.name ?? "Try-demo"}
          </Text>
          <PreviewMessage latestMessage={item.latestMessage} />
        </View>

        <View className="w-fit h-12 py-1  pr-2 justify-between items-end">
          <Text className="text-[#06152D] text-xs font-medium">
            {timeStampFormatter(item?.updatedAt ?? "")}
          </Text>
          {item?.isUnread && (
            <Text className="text-white bg-[#2563EB] text-[8px] font-medium px-[6px] py-[2.5px] rounded-full  ">
              New
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
