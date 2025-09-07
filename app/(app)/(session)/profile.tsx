import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ChatHeader } from "@/components/header/chat.header";
import { UserInfo } from "@/components/screen/profile/userInfo";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Profile() {
  return (
    <CustomSafeAreaView background="blue" className="bg-white">
      <View className="w-full h-full">
        <ChatHeader isNavigate={false} />
        <ScrollView>
          <View className="gap-y-2 w-[90%] mx-auto py-2">
            <UserInfo />
          </View>
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
}
