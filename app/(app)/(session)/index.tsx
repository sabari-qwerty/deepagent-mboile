import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ContactHeader } from "@/components/header/contact.header";
import { ContactList } from "@/components/screen/contact/conatact.list";
import { Mentioned } from "@/components/screen/contact/mentioned";
import { SearchBar } from "@/components/screen/contact/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { conversationFilterType, converstationStatusType } from "@/types/type";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";

const ChatScreen: FC = () => {
  const { open } = useDrawer();
  const { handleLogout } = useAuth();

  const [_, setActiveFilter] = useStorage(StorageKeys.activeFilter);
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);
  const [status, setStatus] = useState<converstationStatusType>("opened");


  const [generalFilter, setGeneralFilter] =
    useState<conversationFilterType>("general");

  useEffect(() => {
    setActiveFilter([
      "contact",
      String(activeWorkspaceId),
      generalFilter,
      status,
    ]);
  }, [activeWorkspaceId, status, generalFilter]);

  return (
    <CustomSafeAreaView className="bg-white gap-y-6 pb-2">
      <ContactHeader />
      <View className="gap-y-0">
        <SearchBar handleOpen={() => {}} />
        <Mentioned onPress={() => {}} status="opened" filter="general" />
      </View>
      <ContactList />
    </CustomSafeAreaView>
  );
};

export default ChatScreen;
