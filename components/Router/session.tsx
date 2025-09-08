import { Stack } from "expo-router";
import { FC } from "react";

export const SessionRoute: FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        animationDuration: 200,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="preview" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="workspace" />
    </Stack>
  );
};
