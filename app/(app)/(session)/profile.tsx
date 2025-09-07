import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ChatHeader } from "@/components/header/chat.header";
import { CustomerTag } from "@/components/screen/profile/CustomerTag";
import { UserInfo } from "@/components/screen/profile/profileInfo";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Profile() {
  return (
    <CustomSafeAreaView background="blue" className="bg-white">
      <View className="w-full h-full">
        <ChatHeader isNavigate={false} />
        <ScrollView>
          <UserInfo />
          <CustomerTag />
          {/* <ProfileContact /> */}
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
}
