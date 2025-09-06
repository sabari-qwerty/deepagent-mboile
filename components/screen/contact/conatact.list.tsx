import { ConatactCard } from "@/components/card/contact.card";
import { useSocket } from "@/components/provider/socket";
import { useStorage } from "@/hooks/useStorage";
import { SessionUpdate } from "@/lib/utils/contactscreen/sessionupdate";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import {
  ContactData,
  conversationFilterType,
  converstationStatusType,
} from "@/types/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export const ContactList: FC = () => {
  const [activeFilter] = useStorage<string[] | null>(StorageKeys.activeFilter);
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);

  const { socket } = useSocket();

  const [selectedContact, setSelectedContact] = useState<ContactData | null>(
    null
  );

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
          ((
            activeFilter as unknown as string[]
          )[2] as conversationFilterType) || "general",
        knowledgeBaseId:
          (activeFilter as unknown as string[])[1] ||
          (activeWorkspaceId as string) ||
          "",
        option: "allMessage",
        page: pageParam as number,
        pageSize: 15,
        status:
          ((
            activeFilter as unknown as string[]
          )[3] as converstationStatusType) || "opened",
      }),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has 15 items, there might be more
      return lastPage?.length === 15 ? allPages.length + 1 : undefined;
    },
    enabled: String(activeFilter) !== "null" && activeFilter !== null,
  });

  useEffect(() => {
    if (socket === null && activeWorkspaceId == null && activeFilter === null)
      return;

    if (socket && activeWorkspaceId && activeFilter) {
      socket.emit("onKnowledgeBaseJoin", {
        knowledgeBaseId: String(activeWorkspaceId),
      });

      socket.on("onSessionUpdate", (payload: ContactData) => {
        SessionUpdate({
          currentKesy: activeFilter as string[],
          payload,
        });
      });
    }
  }, [socket, data]);

  return (
    <View className="w-[95%] mx-auto  h-full flex-1 ">
      {isLoading || (!isFetchingNextPage && isFetching) ? (
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
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
            />
          }
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};
