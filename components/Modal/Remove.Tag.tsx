import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface prop {
  close: () => void
  handleRemoveTag: () => void
}

export const RemoveTag: FC<prop> = ({close, handleRemoveTag}) => {
  return (
    <>
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Remove Tag
        </Text>
        <Text className="text-sm text-gray-600 leading-5">
          Are you sure you want to remove this tag?
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row border-t border-gray-200">
        <TouchableOpacity
          onPress={close}
          className="flex-1 py-4 border-r border-gray-200"
        >
          <Text className="text-center text-gray-600 font-medium">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemoveTag} className="flex-1 py-4">
          <Text className="text-center text-red-600 font-semibold">Remove</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
