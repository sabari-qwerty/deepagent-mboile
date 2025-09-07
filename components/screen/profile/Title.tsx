import { Icons } from "@/constants/icons";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileTitleProps {
  name: string;
  icon: React.ReactNode;
  isPressable?: boolean;
  onPress?: () => void;
}

export const ProfileTitle: FC<ProfileTitleProps> = ({
  name,
  icon,
  isPressable,
  onPress,
}) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-x-2 py-2 flex-1">
        {icon}
        <Text className="text-lg font-medium text-text-secondary">{name}</Text>
      </View>

      {isPressable && (
        <TouchableOpacity className="p-2 w-10 " onPress={() => onPress?.()}>
          <Icons.pluseCircle color={"#586474"} size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};
