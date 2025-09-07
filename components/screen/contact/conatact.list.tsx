import { ConatactCard } from "@/components/card/contact.card";
import { useSocket } from "@/components/provider/socket";
import Swipeable from "@/components/util/swiper";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { SessionUpdate } from "@/lib/utils/contactscreen/sessionupdate";
import { UpdateStatus } from "@/lib/utils/contactscreen/status.update";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { queryClient } from "@/tanstack-query";
import {
  ContactData,
  conversationFilterType,
  converstationStatusType,
  StatusUpdatePayload,
} from "@/types/type";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useSharedValue, withSpring } from "react-native-reanimated";

export const ContactList: FC = () => {
  // local storage
  const [currentkey] = useStorage<string[] | null>(StorageKeys.activeFilter);
  const [currentContact, setCurrentContact] = useStorage(
    StorageKeys.contactData
  );
  const [activeFilter] = useStorage<string[] | null>(StorageKeys.activeFilter);
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);

  // swipeable state
  const [contactId, setContactId] = useState("");
  const translateX = useSharedValue(0);

  const { socket } = useSocket();

  const { mutate: statusUpdate } = useMutation({
    mutationFn: (payload: StatusUpdatePayload) =>
      services.status.update(payload),
    onSuccess: async () => {
      ToastAndroid.show("Status updated", ToastAndroid.SHORT);

      // Invalidate all contact-related queries except the current one
      await queryClient.refetchQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return (
            queryKey[0] === "contact" &&
            JSON.stringify(queryKey) !== JSON.stringify(activeFilter)
          );
        },
      });
    },
  });

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

  const handleClose = () => {
    translateX.value = withSpring(0);
    setContactId("");
  };

  const oprations = [
    {
      text: "closed",
      onPress: ({ sessionId }: { sessionId: string }) => {
        UpdateStatus({
          status: "closed",
          sessionId,
          keys: currentkey as unknown as string[],
          ContactData: JSON.parse(currentContact as string),
          setContactData: setCurrentContact,
          updateRequest: statusUpdate,
          knowledgeBaseId: String(activeWorkspaceId),
          close: () => handleClose(),
        });
      },
      isVisible:
        currentkey !== null &&
        (currentkey as unknown as string[])[3] === "opened",
      // currentkey && (currentkey[3] as unknown as converstationStatusType) === "opened"
      icon: <Icons.closed color={"#fff"} size={20} />,
      bgColor: "bg-red-500",
    },
    {
      text: "opened",
      onPress: ({ sessionId }: { sessionId: string }) => {
        UpdateStatus({
          status: "opened",
          sessionId,
          keys: currentkey as unknown as string[],
          ContactData: JSON.parse(currentContact as string),
          setContactData: setCurrentContact,
          updateRequest: statusUpdate,
          knowledgeBaseId: String(activeWorkspaceId),
          close: () => {},
        });
      },
      isVisible:
        currentkey !== null &&
        (currentkey as unknown as string[])[3] === "closed",
      icon: <Icons.opened color={"#fff"} size={20} />,
      bgColor: "bg-green-500",
    },
  ];

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
            <Swipeable
              oprations={oprations}
              itemId={item._id}
              closeRow={handleClose}
              contactId={contactId}
              setContactId={setContactId}
            >
              <ConatactCard
                item={item}
                onPress={async () => {
                  router.push(`/(app)/(session)/ChatScreen`);

                  setCurrentContact({
                    ...item.userData,
                    platform: item.platform,
                    status: item.status,
                  });
                }}
              />
            </Swipeable>
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
