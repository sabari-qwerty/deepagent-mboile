import { localWorkspace, Workspace } from "@/types/type";
import { FC } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { WorkSpaceCard } from "../card/work.space.card";

interface props {
  refetch: () => void;
  isLoading: boolean;
  data?: Workspace[];
  tempWorkspace: localWorkspace[];
  handleWorkspace: ({ workspace }: { workspace: localWorkspace }) => void;
}

// data && data.length > 0

export const WorkspaceFlatList: FC<props> = ({
  refetch,
  isLoading,
  data,
  tempWorkspace,
  handleWorkspace,
}) => {
  return isLoading ? (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator color={"#2563eb"} size="large" />
    </View>
  ) : data && data.length > 0 ? (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <WorkSpaceCard
          id={item._id}
          name={item.name}
          imageUrl={item.chatWidgeData.botProfile}
          isCheckbox
          isSelected={
            tempWorkspace.find((data) => data.id === item._id) ? true : false
          }
          shared={item.shared}
          handleWorkspace={() =>
            handleWorkspace({
              workspace: {
                id: item._id,
                name: item.name,
                imageUrl: item.chatWidgeData.botProfile,
                shared: item.shared,
              },
            })
          }
        />
      )}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
      }
    />
  ) : (
    <View className="flex-1 justify-center items-center gap-y-2">
      <Text className="text-text-primary  font-bold">No Workspace founed</Text>
      <Pressable
        onPress={() => Linking.openURL("https://app.deepagent.gozen.io/")}
      >
        <Text className="text-primary font-bold">Create Workspace</Text>
      </Pressable>
    </View>
  );
};
