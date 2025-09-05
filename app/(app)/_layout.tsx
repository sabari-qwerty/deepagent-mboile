import { CustomDrawer } from "@/components/drawer/CustomDrawer";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          swipeEnabled: false,
          drawerLabelStyle: {
            marginLeft: 20,
          },
          headerShown: false,
        }}
        drawerContent={(prop) => <CustomDrawer {...prop} />}
      >
        <Drawer.Screen
          name="(session)"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
