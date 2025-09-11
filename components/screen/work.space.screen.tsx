import { useAuth } from "@/hooks/useAuth";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { localWorkspace, Workspace } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FC, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { CustomSafeAreaView } from "../container/custom.safe.areya";
import { WorkspaceFlatList } from "../FlatList/workspace.flat.list";
import { WorkSpaceHeader } from "../header/work.space.header";

export const WorkSpaceScreen: FC = () => {
  const { handleLogout } = useAuth();

  const { data, isLoading, refetch } = useQuery<Workspace[]>({
    queryKey: ["workspace"],
    queryFn: () => services.workspace.get(),
  });

  const [allWorkspaces, setAllWorkspaces] = useStorage<localWorkspace[]>(
    StorageKeys.allWorkspaces
  );

  const [activeWorkspace, setActiveWorkspace] = useStorage<localWorkspace>(
    StorageKeys.activeWorkspace
  );

  const [activeWorkspaceId, setActiveWorkspaceId] = useStorage<string | null>(
    StorageKeys.activeWorkspaceId
  );

  const [tempWorkspace, setTempWorkspace] = useState<localWorkspace[]>(
    allWorkspaces ?? []
  );

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

  const handleSelectAll = () => {
    if (data) {
      const mappedWorkspaces: localWorkspace[] = data.map((workspace) => ({
        id: workspace._id,
        name: workspace.name,
        imageUrl: workspace.chatWidgeData.botProfile,
        shared: workspace.shared,
      }));
      setTempWorkspace(mappedWorkspaces);
    }
  };

  const handleNext = () => {
    setActiveWorkspaceId(tempWorkspace[0].id);
    setActiveWorkspace(tempWorkspace[0]);
    setAllWorkspaces(tempWorkspace);
    router.replace("/(app)/(session)");

    setTimeout(() => {
      setTempWorkspace([]);
    }, 1000);
  };

  return (
    <CustomSafeAreaView background="blue" className="bg-white ">
      {isLoading ? (
        <View className="flex-1 w-full h-full justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <View className="flex-1 gap-y-4">
          {data && data.length > 0 && (
            <WorkSpaceHeader
              isNext={tempWorkspace.length > 0}
              handleSelectAll={handleSelectAll}
              handleNext={handleNext}
            />
          )}
          <WorkspaceFlatList
            refetch={refetch}
            isLoading={isLoading}
            data={data?.filter((item) => item.status === "READY")}
            tempWorkspace={tempWorkspace}
            handleWorkspace={handleWorkspace}
          />
        </View>
      )}
    </CustomSafeAreaView>
  );
};
