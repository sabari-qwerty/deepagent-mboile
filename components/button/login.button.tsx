import { useAuth } from "@/hooks/useAuth";
import { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export const LoginButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useAuth();

  return (
    <TouchableOpacity
      className="bg-primary rounded-xl min-h-[62px] flex flex-row justify-center items-center w-full mt-7"
      onPress={() => handleLogin({ setValue: (value) => setIsLoading(value) })}
    >
      {!isLoading ? (
        <Text className="text-white  text-xl font-medium">
          Continue with Email
        </Text>
      ) : (
        <ActivityIndicator
          animating={true}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};
