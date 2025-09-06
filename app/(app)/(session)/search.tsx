import { ConatactCard } from "@/components/card/contact.card";
import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { searchFilter } from "@/constants/filter";
import { Icons } from "@/constants/icons";
import { useDebouse } from "@/hooks/useDebouse";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
    FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchScreen: FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);
  const debouseSearch = useDebouse(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouseSearch, filter],
    queryFn: () =>
      services.contact.search.get({
        knowledgeBaseId: activeWorkspaceId as string,
        conversation: filter,
        tag: filter,
        q: debouseSearch,
      }),

    enabled: !!activeWorkspaceId && !!debouseSearch && !!filter,
  });

  return (
    <CustomSafeAreaView className="bg-white">
      <KeyboardAvoidingView
        behavior={"padding"}
        className="flex-1 w-fll h-full"
      >
        <View className="w-[95%] mx-auto gap-y-4  h-full flex-1  py-4 ">
          <View className="flex flex-row items-center gap-x-2  bg-[#F9FAFB] rounded-md px-2 overflow-hidden">
            <Icons.SearchIcon />
            <TextInput
              value={search}
              placeholder="Search..."
              placeholderTextColor={"#888e9b"}
              className=" w-full h-12 flex-1 rounded-md text-[#888e9b] "
              onChangeText={setSearch}
            />
          </View>
          <View className="gap-y-4 ">
            <Text className="text-base font-medium text-text-primary">
              Conversation
            </Text>
            <View className="flex-row gap-x-4">
              {searchFilter.map((item, key) => (
                <TouchableOpacity
                  onPress={() => {
                    if (filter.includes(item.value)) {
                      setFilter(filter.filter((data) => data !== item.value));
                    } else {
                      setFilter([...filter, item.value]);
                    }
                  }}
                  key={key}
                  className={` ${
                    filter.includes(item.value)
                      ? "bg-primary text-white rounded-md border-primary"
                      : "  border-text-secondary rounded-md "
                  } p-1.5 border`}
                >
                  <Text
                    className={`text-sm ${
                      filter.includes(item.value)
                        ? "text-white"
                        : "text-text-secondary"
                    } pr-2`}
                  >
                    {item.lable}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {isLoading && search && (
            <View className="flex-1   w-full h-full justify-center items-center">
              <Text className="text-text-secondary">Loading...</Text>
            </View>
          )}

          {!isLoading && search.length > 0 && data?.length === 0 && (
            <View className="flex-1   w-full h-full justify-center items-center">
              <Text className="text-text-secondary">No result found</Text>
            </View>
          )}

          {data && data.length > 0 && (
            <View className="flex-1  w-full h-full ">
              <FlatList
                className="w-full h-full flex-1"
                data={data}
                renderItem={({ item }) => (
                  <ConatactCard item={item} onPress={() => {}} />
                )}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default SearchScreen;
