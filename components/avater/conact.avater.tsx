import { ProfileImage } from "@/constants/image";
import { platform } from "@/types/type";
import { FC } from "react";
import { Image, View } from "react-native";
import { PlatFromBadge } from "./PlatFromBadge";

interface prop {
  imageId: string;
  platform: platform;
}

export const ConatactAvatar: FC<prop> = ({ imageId, platform }) => {
  return (
    <View
      className={`w-12 h-12  relative   ${
        false && "border border-[#05C270] p-0.5 rounded-full "
      }`}
    >
      <Image
        source={ProfileImage[imageId as keyof typeof ProfileImage]}
        className="w-full h-full rounded-full "
      />
      <View className="absolute -right-1 bottom-0">
        <PlatFromBadge platform={platform} />
      </View>
    </View>
  );
};
