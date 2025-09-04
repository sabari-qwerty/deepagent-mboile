import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { Image, View } from "react-native";
export default function SplaceScreen() {
  return (
    <CustomSafeAreaView background="blue">
      <View className="W-full h-full items-center justify-center bg-white">
        <Image
          source={require("../assets/images/splash-icon.png")}
          width={150}
          height={150}
          resizeMode="contain"
          className=" w-[150px] h-[150px]"
        />
      </View>
    </CustomSafeAreaView>
  );
}
