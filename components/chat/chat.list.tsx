import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { queryClient } from "@/tanstack-query";
import {
  ChatSession,
  MessagesResponse,
  onTypingStartPayload,
} from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FC, useContext, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import {
  ChatScreenContext,
  ChatScreenContextProp,
} from "../provider/chat.screen.provider";
import { useSocket } from "../provider/socket";
import { BabuleRoute } from "./babule/babule.route";

export const ChatList: FC = () => {
  const { sessionId } = useLocalSearchParams();
  const [tag, setTag] = useStorage(StorageKeys.tags);
  const [teamId, setTeamId] = useStorage(StorageKeys.teamId);
  const [assignee, setAssignee] = useStorage(StorageKeys.assignee);
  const { socket } = useSocket();

  const [currentKey] = useStorage<string | null>(StorageKeys.activeFilter);

  const { setIsTyping } = useContext(
    ChatScreenContext
  ) as ChatScreenContextProp;

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["chat", sessionId],
    queryFn: () =>
      services.contact.chat.get({ sessionId: sessionId as string }),
  });

  console.log(["chat", sessionId]);

  useEffect(() => {
    if (!data) return;

    setTag(data.tags || []);
    setTeamId(data.teamId || "");
    setAssignee(data.assignedPerson || "");
  }, [data]);
  useEffect(() => {
    if (socket === null && sessionId === null) return;

    if (socket) {
      socket.emit("onSessionJoin", { sessionId: sessionId as string });

      socket.on("onMessage", (payload: MessagesResponse) => {
        if (sessionId !== payload.sessionId) return;

        const queryKey = ["chat", sessionId];

        const ChatMessageData = queryClient.getQueryData(
          queryKey
        ) as ChatSession;

        if (!ChatMessageData) return;

        const set_id = new Set<string>();

        let messageData = ChatMessageData.messages.map((message) => {
          set_id.add(message.id);
          return {
            ...message,
            isNowAdded: false,
          };
        });

        if (!set_id.has(payload.id)) {
          messageData = [
            ...messageData,
            {
              ...payload,
              isNowAdded: false,
            },
          ];
        }

        queryClient.setQueryData(queryKey, {
          ...ChatMessageData,
          messages: messageData,
        });
      });

      socket.on("onTypingStart", (payload: onTypingStartPayload) => {
        if (payload.userType === "agent") return;
        setIsTyping(true);
      });
      socket.on("onTypingStop", (payload: onTypingStartPayload) => {
        if (payload.userType === "agent") return;
        setIsTyping(false);
      });

      socket.on("messageSeen", (payload: any) => {
        if (sessionId !== payload.sessionId) return;

        const queryKey = ["chat", sessionId];

        const ChatMessageData = queryClient.getQueryData(
          queryKey
        ) as ChatSession;

        if (!ChatMessageData) return;

        const updatedMessages = ChatMessageData.messages.map((message) => ({
          ...message,
          seen: message.seen ? message.seen : true,
        }));

        queryClient.setQueryData(queryKey, {
          ...ChatMessageData,
          messages: updatedMessages,
        });
      });

      socket.on("sessionMessageRead", (payload: any) => {
        if (sessionId !== payload.sessionId && currentKey !== null) return;

        const queryKey = JSON.parse(currentKey as string);

        const contactData = queryClient.getQueryData(queryKey) as ChatSession;

        if (!contactData) return;

        const updatedContactData = {
          ...contactData,
          messages: contactData.messages.map((message) => ({
            ...message,
            seen: message.seen ? message.seen : true,
          })),
        };

        queryClient.setQueryData(queryKey, updatedContactData);
      });

      socket.on("onMessageDelete", (payload: any) => {
        const kesy = ["chat", sessionId];
        const ChatMessageData = queryClient.getQueryData(kesy) as ChatSession;
        const filterChatMessageData = ChatMessageData.messages.filter(
          (message) => message.id !== payload.messageId
        );
        queryClient.setQueryData(kesy, {
          ...ChatMessageData,
          messages: filterChatMessageData,
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("onMessage");
        socket.off("onTypingStart");
        socket.off("onTypingStop");
        socket.off("messageSeen");
        socket.off("onSessionMessageRead");
        socket.off("onMessageDelete");
      }
    };
  }, [socket, sessionId]);

  return (
    <View className="flex-1  w-full h-full ">
      {isLoading && (
        <View className="flex-1  justify-center items-center">
          <ActivityIndicator size="large" color="#0048e6" />
        </View>
      )}

      {!isLoading && data && data.messages.length === 0 && (
        <View className="flex-1  justify-center items-center">
          <Text className="text-text-secondary">No Chat Founed</Text>
        </View>
      )}

      {!isLoading && data && data.messages.length > 0 && (
        <FlatList
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          data={JSON.parse(JSON.stringify(data?.messages)).reverse()}
          renderItem={({ item }: { item: MessagesResponse }) => {
            return <BabuleRoute item={item} />;
          }}
          keyExtractor={(item, index) => String(index)}
          inverted
          className="flex-1 "
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
            />
          }
        />
      )}
    </View>
  );
};
