import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ChatHeader } from "@/components/header/chat.header";
import { CahtScreenProvider } from "@/components/provider/chat.screen.provider";
import { MakeAsAssignee } from "@/components/screen/profile/asassine";
import { CustomerTag } from "@/components/screen/profile/CustomerTag";
import { UserInfo } from "@/components/screen/profile/profileInfo";
import ViewedPage from "@/components/screen/profile/ViewPage";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Profile() {
  return (
    <CustomSafeAreaView background="blue" className="bg-white">
      <CahtScreenProvider>
        <View className="w-full h-full">
          <ChatHeader isNavigate={false} />
          <ScrollView>
            <UserInfo />
            <CustomerTag />
            <MakeAsAssignee />
            <ViewedPage />
          </ScrollView>
        </View>
      </CahtScreenProvider>
    </CustomSafeAreaView>
  );
}
