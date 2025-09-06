import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { localWorkspace } from "@/types/type";
import { FC } from "react";
import { FlatList, View } from "react-native";
import { DrawerCard } from "../card/drawer.card";

interface prop {
  close: () => void;
}

export const DrawerFlatList: FC<prop> = ({ close }) => {
  const [allWorkspaces] = useStorage(StorageKeys.allWorkspaces);
  const [activeWorkspace, setActiveWorkspace] = useStorage(
    StorageKeys.activeWorkspace
  );
  const [activeWorkspaceId, setActiveWorkspaceId] = useStorage(
    StorageKeys.activeWorkspaceId
  );

  const handleWorkspace = (workspace: localWorkspace) => {
    setActiveWorkspace(workspace);
    setActiveWorkspaceId(workspace.id);
    close();
  };

  return (
    <View className="flex-1 w-full h-full">
      <FlatList
        data={allWorkspaces as localWorkspace[]}
        renderItem={({ item }) => (
          <DrawerCard item={item} onPress={() => handleWorkspace(item)} />
        )}
      />
    </View>
  );
};
