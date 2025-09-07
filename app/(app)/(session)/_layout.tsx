import { SessionRoute } from "@/components/Router/session";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function SessionLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionRoute />
    </GestureHandlerRootView>
  );
}
