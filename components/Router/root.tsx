import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { Stack } from "expo-router";
import { FC, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Provider from "../provider";

export const RootRouter: FC = () => {
  const [accessToken] = useStorage(StorageKeys.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceId] = useStorage(StorageKeys.activeWorkspaceId);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []); 


  return (
    <Provider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          {/* splashscreen page */}
          <Stack.Protected guard={isLoading}>
            <Stack.Screen name="splashscreen" />
          </Stack.Protected>

          {/* login page */}
          <Stack.Protected guard={accessToken === null && !isLoading}>
            <Stack.Screen name="index" />
          </Stack.Protected>

          {/* workspace page */}
          <Stack.Protected
            guard={accessToken !== null && !isLoading && workspaceId === null}
          >
            <Stack.Screen name="workspace" />
          </Stack.Protected>

          {/* session page */}
          <Stack.Protected
            guard={workspaceId !== null && !isLoading && accessToken !== null}
          >
            <Stack.Screen name="(app)" />
          </Stack.Protected>
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
};
