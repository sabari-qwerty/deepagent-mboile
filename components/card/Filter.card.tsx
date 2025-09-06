import { Text, TouchableOpacity, View } from "react-native";

import { genericFiltersValues, StatusOverViewResponse } from "@/types/type";
import { FC } from "react";

interface prop {
  options: genericFiltersValues;
  onPress: (value: string) => void;
  active: string;
  data?: StatusOverViewResponse;
  showCount?: boolean;
}

export const FilterCard: FC<prop> = ({
  options,
  onPress,
  active,
  data,
  showCount,
}) => {
  return (
    <View className="bg-white py-2">
      <View className="w-[95%] mx-auto">
        {Object.values(options).map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => {
              onPress(item.value);
            }}
            className={`flex flex-row items-center justify-between gap-x-2 py-2 px-4 ${
              active === item.value && "bg-primary  rounded-md "
            }`}
          >
            <View className="flex flex-row gap-x-2">
              <item.icon isActive={active === item.value} />
              <Text
                className={` ${
                  active === item.value ? "text-[#fff]" : "text-text-primary"
                }  font-medium `}
              >
                {item.name}
              </Text>
            </View>
            {showCount && (
              <Text
                className={`${
                  active === item.value ? "text-[#fff]" : "text-text-primary"
                }  font-medium `}
              >
                {data
                  ? Math.abs(data?.[item.value as keyof StatusOverViewResponse])
                  : 0}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
