import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { Text } from "react-native";

export const AuthError: FC = () => {
  const { error } = useAuth();

  return (
    error && (
      <Text className="text-sm text-red-400 pt-2 ">
        {"*" + " " + error?.message}
      </Text>
    )
  );
};
