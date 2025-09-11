import { Preivewheader } from "@/components/header/preview.header";
import { PreviewRoute } from "@/components/screen/preview/preview.route";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Preview() {
  StatusBar.setBackgroundColor("#0d1017");
  StatusBar.setBarStyle("light-content");
  StatusBar.setTranslucent(true);

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-black">
      <StatusBar
        animated={true}
        backgroundColor="#0d1017"
        barStyle="light-content"
        translucent={true}
      />
      <Preivewheader />
      <View className="w-full h-full flex-1">
        <PreviewRoute />
      </View>
    </SafeAreaView>
  );
}
