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
            <View className="w-[40px] h-[12px] rounded-xl  items-center justify-center bg-primary/80">
              <Text className="text-[8px] text-white font-bold">shared</Text>
            </View>
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
