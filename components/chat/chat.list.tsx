import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { MessagesResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FC, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useSocket } from "../provider/socket";
import { BabuleRoute } from "./babule/babule.route";

export const ChatList: FC = () => {
  const { sessionId } = useLocalSearchParams();
  const [tag, setTag] = useStorage(StorageKeys.tags);
  const [teamId, setTeamId] = useStorage(StorageKeys.teamId);
  const [assignee, setAssignee] = useStorage(StorageKeys.assignee);
  const { socket } = useSocket();

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
