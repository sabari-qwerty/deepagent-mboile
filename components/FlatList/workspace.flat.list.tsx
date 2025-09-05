import { services } from "@/services";
import { localWorkspace, Workspace } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { WorkSpaceCard } from "../card/work.space.card";

export const WorkspaceFlatList: FC = () => {
  const { data, isLoading } = useQuery<Workspace[]>({
    queryKey: ["workspace"],
    queryFn: () => services.workspace.get(),
  });

  const [tempWorkspace, setTempWorkspace] = useState<localWorkspace[]>([]);

  const handleWorkspace = ({ workspace }: { workspace: localWorkspace }) => {
    const isExist = tempWorkspace.find((item) => item.id === workspace.id);
    if (isExist) {
      setTempWorkspace((prev) =>
        prev.filter((item) => item.id !== workspace.id)
      );
    } else {
      setTempWorkspace((prev) => [...prev, workspace]);
    }
  };

  return isLoading ? (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator color={"#2563eb"} size="large" />
    </View>
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <WorkSpaceCard
          id={item._id}
          name={item.name}
          imageUrl={item.chatWidgeData.botProfile}
          isCheckbox
          isSelected={true}
          shared={true}
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
    />
  );
};
