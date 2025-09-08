import {
  ActionLocalContextProp,
  useActionLocal,
} from "@/components/provider/action.local";
import { Icons } from "@/constants/icons";
import { router } from "expo-router";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface prop {
  handleOpen: () => void;
}

export const SearchBar: FC<prop> = ({ handleOpen }) => {
  const { locked, runOnce } = useActionLocal() as ActionLocalContextProp;
  return (
    <View className="w-[95%] mx-auto flex flex-row justify-center items-center gap-x-2">
      <TouchableOpacity
        className="flex-1 bg-[#F9FAFB]  flex flex-row rounded-xl items-center"
        style={{
          paddingLeft: 10,
        }}
        onPress={() => {
          runOnce(async () => {
            router.push("/search");
          });
        }}
        disabled={locked}
      >
        <Icons.SearchIcon />
        <View style={{ flex: 1 }} className="w-full  py-2 ">
          <Text className="text-[#888E9B] px-2">Search....</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleOpen}
        className="bg-[#F9FAFB] p-2.5 rounded-xl"
      >
        <Icons.FilterIcon />
      </TouchableOpacity>
    </View>
  );
};
