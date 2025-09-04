import { queryClient } from "@/tanstack-query";
import { Children } from "@/types/type";
import NetInfo from "@react-native-community/netinfo";
import {
  focusManager,
  onlineManager,
  QueryClientProvider,
} from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

//  this code tell this app is online are offline
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => setOnline(!!state.isConnected));
});

// find active screen it macke active  for request if is not active screen dous not make request
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const QueryProvider: FC<Children> = ({ children }) => {
  // this code active  gobale listner
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
