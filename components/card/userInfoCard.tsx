import truncateText from "@/lib/utils/truncateText";
import { FC } from "react";
import { Text, View } from "react-native";

interface ShowDetailsProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const UserInfoCard: FC<ShowDetailsProps> = ({ icon, label, value }) => {
  return (
    <View className="py-2 flex-row items-start   w-full flex-1 gap-y-1 ">
      <View className="w-full flex-row items-center gap-x-2">
        <View className="flex-row gapx-x-1 items-center   w-[130px]    justify-between">
          <View className=" flex-row gap-x-0.5 items-center ">
            <View className="w-4">{icon}</View>
            <View className="px-1">
              <Text className="text-text-primary font-medium ">{label}</Text>
            </View>
          </View>

          <View className=" justify-end  ">
            <Text className="text-text-primary font-medium">:</Text>
          </View>
        </View>

        <View className="flex-1 ">
          <Text className="text-text-secondary font-medium w-[90%] text-left ">
            {truncateText({ text: value, maxLength: 20 })}
          </Text>
        </View>
      </View>
    </View>
  );
};
