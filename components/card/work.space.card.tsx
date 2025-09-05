import { cn } from "@/lib/utils/cn";
import Checkbox from "expo-checkbox";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FallBackImage } from "../image/falback.image";
interface props {
  id: string;
  name: string;
  imageUrl: string;
  shared: boolean;
  className?: string;
  isCheckbox?: boolean;
  isSelected?: boolean;
  handleWorkspace: () => void;
}

export const WorkSpaceCard: FC<props> = ({
  id,
  name,
  imageUrl,
  className,
  isCheckbox,
  isSelected,
  handleWorkspace,
  shared,
}) => {
  return (
    <TouchableOpacity
      className="w-full  flex-row items-center justify-between gap-x-4 p-2 border-b border-border-primary"
      onPress={() => handleWorkspace()}
    >
      <View className="flex-row items-center gap-x-4 relative">
        <View
          className={cn(
            `w-12 h-12 bg-white rounded-md overflow-hidden ${className}`
          )}
        >
          <FallBackImage imageUrl={imageUrl} />
        </View>

        <View>
          <Text className="text-text-primary text-xl font-bold ">{name}</Text>
          {shared && (
            <Text className="text-text-secondary text-[8px] bg-white w-[40px] rounded-md items-center justify-center px-2">
              shared
            </Text>
          )}
        </View>
      </View>

      {isCheckbox && (
        <Checkbox
          className="m-[8px] -z-1"
          value={isSelected}
          color={isSelected ? "#2563eb" : "#E2E5E9"}
          onValueChange={() => {
            console.log("hello world");
          }}
        />
      )}
    </TouchableOpacity>
  );
};
