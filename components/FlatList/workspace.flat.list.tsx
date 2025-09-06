import { localWorkspace, Workspace } from "@/types/type";
import { FC } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { WorkSpaceCard } from "../card/work.space.card";
import { WorksSpaceFallback } from "../fallback/workspace.flat.list.fallback";

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
    <View className="flex-1 w-full h-full">
      <View className="flex-1">
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
                tempWorkspace.find((data) => data.id === item._id)
                  ? true
                  : false
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
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
            />
          }
        />
      </View>
      <View className="w-[95%] mx-auto py-2 items-center ">
        <Text className="text-text-secondary/50 font-bold text-sm">
          Only Show workspaces Status is Ready
        </Text>
      </View>
    </View>
  ) : (
    <WorksSpaceFallback refetch={refetch} />
  );
};
