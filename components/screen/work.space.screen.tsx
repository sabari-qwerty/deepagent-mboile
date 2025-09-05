import { useAuth } from "@/hooks/useAuth";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { localWorkspace, Workspace } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { CustomSafeAreaView } from "../container/custom.safe.areya";
import { WorkspaceFlatList } from "../FlatList/workspace.flat.list";
import { WorkSpaceHeader } from "../header/work.space.header";

export const WorkSpaceScreen: FC = () => {
  const [isNext, setIsNext] = useState(false);

  const { handleLogout } = useAuth();

  const { data, isLoading, refetch } = useQuery<Workspace[]>({
    queryKey: ["workspace"],
    queryFn: () => services.workspace.get(),
  });

  const [allWorkspaces, setAllWorkspaces] = useStorage<localWorkspace[]>(
    StorageKeys.allWorkspaces
  );

  const [tempWorkspace, setTempWorkspace] = useState<localWorkspace[]>(
    allWorkspaces ? JSON.parse(String(allWorkspaces)) : []
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

  useEffect(() => {
    const temp = allWorkspaces ? JSON.parse(String(allWorkspaces)) : [];
    setIsNext(JSON.stringify(temp) !== JSON.stringify(tempWorkspace));
  }, [tempWorkspace]);

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
    setAllWorkspaces(tempWorkspace);
  };

  return (
    <CustomSafeAreaView background="blue">
      {isLoading ? (
        <View className="flex-1 w-full h-full justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <View className="flex-1 gap-y-4">
          {data && data.length > 0 && (
            <WorkSpaceHeader
              isNext={isNext}
              handleSelectAll={handleSelectAll}
              handleNext={handleNext}
            />
          )}
          <WorkspaceFlatList
            refetch={refetch}
            isLoading={isLoading}
            data={data}
            tempWorkspace={tempWorkspace}
            handleWorkspace={handleWorkspace}
          />
        </View>
      )}
    </CustomSafeAreaView>
  );
};
