import { FC } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface prop {
  close: () => void;
  text: string;
  setText: (e: string) => void;
  handleAddTag: () => void;
}

export const AddTag: FC<prop> = ({ close, text, setText, handleAddTag }) => {
  return (
    <View className=" gap-y-2">
      {/* Header */}
      <View className="w-[95%] mx-auto pt-2">
        <Text className="text-lg font-semibold text-gray-900 ">Add Tag</Text>
        <Text className="text-sm text-gray-600 leading-5">
          Add a tag to your customer
        </Text>
      </View>

      {/* Body */}
      <View className="w-[95%] mx-auto pb-2">
        <TextInput
          placeholder="Enter tag"
          className="border border-gray-300 rounded-md py-1 px-2 text-text-secondary"
          maxLength={35}
          value={text}
          onChangeText={setText}
        />
      </View>

      {/* Buttons */}
      <View className="flex-row border-t border-gray-200">
        <TouchableOpacity
          onPress={close}
          className="flex-1 py-4 border-r border-gray-200"
        >
          <Text className="text-center text-gray-600 font-medium">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAddTag}
          disabled={false}
          className="flex-1 py-4"
        >
          <Text
            className={`text-center ${
              true ? "text-primary" : "text-primary/60"
            } font-semibold`}
          >
            Add Tag
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
