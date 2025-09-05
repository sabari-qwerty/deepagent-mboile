import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChatScreen: FC = () => {
  const { open } = useDrawer();
  const { handleLogout } = useAuth();
  return (
    <View className="flex-1 w-full h-full items-center justify-center">
      <TouchableOpacity onPress={() => open()}>
        <Text className="text-text-primary font-bold text-2xl">ChatScreen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogout()}>
        <Text className="text-text-primary font-bold text-2xl">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;
