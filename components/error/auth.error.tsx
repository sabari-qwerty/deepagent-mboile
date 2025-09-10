import { useAuth } from "@/hooks/useAuth";
import { FC, useEffect } from "react";
import { Text } from "react-native";

interface prop {
  setIsLoading: (value: boolean) => void;
}

export const AuthError: FC<prop> = ({ setIsLoading }) => {
  const { error } = useAuth();

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return (
    error && (
      <Text className="text-sm text-red-400 pt-2 ">
        {"*" + " " + error?.message}
      </Text>
    )
  );
};
