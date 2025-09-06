import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface props {
  close: () => void;
}

export const LogoutButton: FC<props> = ({ close }) => {
  const { handleLogout } = useAuth();

  const onPress = () => {
    handleLogout();
    close();
  };

  return (
    <TouchableOpacity onPress={onPress} className="">
      <View className="flex-row justify-center items-center gap-x-2">
        <Text className="text-red-500 font-bold text-xl text-center">
          Logout
        </Text>
      </View>
    </TouchableOpacity>
  );
};
