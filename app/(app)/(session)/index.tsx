import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ContactHeader } from "@/components/header/contact.header";
import { Mentioned } from "@/components/screen/contact/mentioned";
import { SearchBar } from "@/components/screen/contact/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { FC } from "react";
import { View } from "react-native";

const ChatScreen: FC = () => {
  const { open } = useDrawer();
  const { handleLogout } = useAuth();
  return (
    <CustomSafeAreaView className="bg-white gap-y-6">
      <ContactHeader />
      <View className="gap-y-0">
        <SearchBar handleOpen={() => {}} />
        <Mentioned onPress={() => {}} status="opened" filter="general" />
      </View>
    </CustomSafeAreaView>
  );
};

export default ChatScreen;
