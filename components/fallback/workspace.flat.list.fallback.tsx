import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

interface props {
  refetch: () => void;
}

export const WorksSpaceFallback: FC<props> = ({ refetch }) => {
  const { handleLogout } = useAuth();

  return (
    <View className="flex-1 justify-center items-center gap-y-2">
      <Text className="text-text-primary  font-bold">No Workspace founed</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://app.deepagent.gozen.io/")}
      >
        <Text className="text-primary font-bold">Create Workspace</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => refetch()}>
        <Text className="text-primary font-bold">Refresh</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogout()}>
        <Text className="text-primary font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
