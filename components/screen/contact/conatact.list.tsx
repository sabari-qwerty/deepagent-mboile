import { ConatactCard } from "@/components/card/contact.card";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import {
  ContactData,
  conversationFilterType,
  converstationStatusType,
} from "@/types/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const ContactList: FC = () => {
  const [activeFilter] = useStorage<string[] | null>(StorageKeys.activeFilter);

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery<ContactData[]>({
    initialPageParam: 1,
    queryKey: activeFilter as string[],
    queryFn: ({ pageParam = 1 }) =>
      services.contact.get({
        gobalFilter:
          ((activeFilter as string[])[2] as conversationFilterType) ||
          "general",
        knowledgeBaseId: (activeFilter as string[])[1] || "",
        option: "allMessage",
        page: pageParam as number,
        pageSize: 15,
        status:
          ((activeFilter as string[])[3] as converstationStatusType) ||
          "opened",
      }),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has 15 items, there might be more
      return lastPage?.length === 15 ? allPages.length + 1 : undefined;
    },
    enabled: activeFilter !== null,
  });

  console.log(data);

  return (
    <View className="w-[95%] mx-auto  h-full flex-1 ">
      {isLoading || isFetching ? (
        <View className="flex-1  justify-center items-center">
          <ActivityIndicator size="large" color="#0048e6" />
        </View>
      ) : data && data.pages.flat().length === 0 ? (
        <View className="flex-1  justify-center items-center">
          <Text className="text-text-secondary">No Chat Founed</Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text className="text-primary">Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={data?.pages.flat()}
          renderItem={({ item }) => (
            <ConatactCard item={item} onPress={() => ""} />
          )}
        />
      )}
    </View>
  );
};
