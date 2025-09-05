import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "@/tanstack-query";
import { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export const LoginButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useAuth();

  const Login = () => {
    handleLogin({ setValue: (value) => setIsLoading(value) });
    queryClient.invalidateQueries({ queryKey: ["workspace"] });
    queryClient.fetchQuery({ queryKey: ["workspace"] });
    queryClient.refetchQueries({ queryKey: ["workspace"] });
    queryClient.clear();
  };

  return (
    <TouchableOpacity
      className="bg-primary rounded-xl min-h-[62px] flex flex-row justify-center items-center w-full mt-7"
      onPress={() => Login()}
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
