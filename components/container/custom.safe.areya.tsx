import { cn } from "@/lib/utils/cn";
import { Children } from "@/types/type";
import { useFocusEffect } from "expo-router";
import { FC, useCallback } from "react";
import { AppState, AppStateStatus, StatusBar } from "react-native";
import { SafeAreaView as RNFSafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps extends Children {
  background?: "blue" | "black";
}

export const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({
  children,
  className,
  background,
}) => {
  // status bar
  const setStatusBarStyle = useCallback(() => {
    StatusBar.setBackgroundColor(background === "blue" ? "#0048e6" : "#000000");
    StatusBar.setBarStyle("light-content");
    StatusBar.setTranslucent(true);
  }, []);

  // Handle screen focus
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle();

      // Handle app state changes
      const subscription = AppState.addEventListener(
        "change",
        (nextAppState: AppStateStatus) => {
          if (nextAppState === "active") {
            setStatusBarStyle();
          }
        }
      );

      return () => {
        subscription.remove();
      };
    }, [setStatusBarStyle])
  );

  return (
    <RNFSafeAreaView
      className={cn(`flex-1 w-full h-full ${className}`)}
      edges={["top", "bottom"]}
    >
      {children}
    </RNFSafeAreaView>
  );
};
