import { FilterSheet } from "@/components/bottomSheet/filtersheet";
import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ContactHeader } from "@/components/header/contact.header";
import { ContactList } from "@/components/screen/contact/conatact.list";
import { Mentioned } from "@/components/screen/contact/mentioned";
import { SearchBar } from "@/components/screen/contact/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import {
  bottomSheet,
  conversationFilterType,
  converstationStatusType,
} from "@/types/type";
import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ChatScreen: FC = () => {
  const { open } = useDrawer();
  const { handleLogout } = useAuth();

  const [_, setActiveFilter] = useStorage(StorageKeys.activeFilter);
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);

  // filters
  const [status, setStatus] = useState<converstationStatusType>("opened");
  const [generalFilter, setGeneralFilter] =
    useState<conversationFilterType>("general");

  // Bottom Sheet

  const [bottomSheet, setBottomSheet] = useState<bottomSheet>("");
  const [snapPoints, setSnapPoints] = useState<string[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setActiveFilter([
      "contact",
      String(activeWorkspaceId),
      generalFilter,
      status,
    ]);
  }, [activeWorkspaceId, status, generalFilter]);

  const { data } = useQuery({
    queryKey: ["status", activeWorkspaceId],
    queryFn: () =>
      services.status.get({ workspaceId: String(activeWorkspaceId) }),
  });

  //  hanlde bottom sheet
  const ShowBottomSheet = ({ bottomSheet }: { bottomSheet: bottomSheet }) => {
    setBottomSheet(bottomSheet);
    setSnapPoints(["100%"]);

    // Use requestAnimationFrame to ensure state updates before expanding
    requestAnimationFrame(() => {
      setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 1);
    });
  };

  const HideBottomSheet = () => {
    bottomSheetRef.current?.close();

    setBottomSheet("");
    setSnapPoints([]);
  };

  return (
    <GestureHandlerRootView className="flex-1 ">
      <CustomSafeAreaView className="bg-white gap-y-6 pb-2">
        <ContactHeader />
        <View className="gap-y-0">
          <SearchBar
            handleOpen={() => ShowBottomSheet({ bottomSheet: "gobalFilter" })}
          />
          <Mentioned
            onPress={() => ShowBottomSheet({ bottomSheet: "status" })}
            status="opened"
            filter="general"
          />
        </View>
        <ContactList />
        <FilterSheet
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          close={HideBottomSheet}
          bottomSheet={bottomSheet}
          data={
            data || {
              general: 0,
              mentioned: 0,
              openChats: 0,
              unassigned: 0,
            }
          }
          gloableFilterData={generalFilter}
          statusFilterData={status}
          setGloableFilterData={setGeneralFilter}
          setStatusFilterData={setStatus}
        />
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ChatScreen;
