import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface prop {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const LoginButton: FC<prop> = ({ setIsLoading, isLoading }) => {
  const { handleLogin } = useAuth();

  const Login = () => {
    handleLogin({ setValue: (value) => setIsLoading(value) });
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
