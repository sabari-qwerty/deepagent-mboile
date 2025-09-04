import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { useAuth } from "@/hooks/useAuth";
import { Text, TouchableOpacity, View } from "react-native";

export default function Workspace() {
  const { handleLogout } = useAuth();
  return (
    <CustomSafeAreaView background="blue">
      <View className="w-full h-full items-center justify-center">
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text className="text-black">Logout</Text>
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  );
}
