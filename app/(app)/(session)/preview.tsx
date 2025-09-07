import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { Preivewheader } from "@/components/header/preview.header";
import { PreviewRoute } from "@/components/screen/preview/preview.route";
import { View } from "react-native";

export default function Preview() {
  return (
    <CustomSafeAreaView background="black" className=" bg-black">
      <Preivewheader />
      <View className="w-full h-full flex-1">
        <PreviewRoute />
      </View>
    </CustomSafeAreaView>
  );
}
