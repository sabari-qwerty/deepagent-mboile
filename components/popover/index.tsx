import { ChatStatusChange } from "@/constants/filter";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { UpdateStatus } from "@/lib/utils/contactscreen/status.update";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { queryClient } from "@/tanstack-query";
import {
  ContactData,
  converstationStatusType,
  CustomContactData,
  StatusUpdatePayload,
} from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FC, useRef } from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";
import { PopeoverCard } from "../card/PopeoverCard";

export const ChatScreenPopover: FC = () => {
  const refPopOver = useRef<Popover>(null);
  const [userData, setUserData] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);
  const [currentkey] = useStorage(StorageKeys.activeFilter);
  const { sessionId } = useLocalSearchParams();
  const [activeFilter] = useStorage<string[] | null>(StorageKeys.activeFilter);

  const { mutate: statusChange } = useMutation({
    mutationFn: (payload: StatusUpdatePayload) =>
      services.status.update(payload),
    onSuccess: async () => {
      ToastAndroid.show("Status updated", ToastAndroid.SHORT);
      // Invalidate all contact-related queries except the current one
      await queryClient.refetchQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return (
            queryKey[0] === "contact" &&
            JSON.stringify(queryKey) !== JSON.stringify(activeFilter)
          );
        },
      });
    },
  });


  return (
    <Popover
      from={
        <TouchableOpacity>
          <Icons.ThreeDotsIcon color="#06152d" />
        </TouchableOpacity>
      }
      arrowShift={0}
      arrowSize={{
        height: -2,
        width: -2,
      }}
      popoverStyle={{
        borderRadius: 6,
        marginTop: 10,
      }}
      onRequestClose={() => {}}
      ref={refPopOver}
    >
      {ChatStatusChange.map((item, key) => (
        <PopeoverCard
          key={key}
          label={item.label}
          value={item.value}
          Icon={item.icon}
          onPress={() => {
            UpdateStatus({
              status: item.value as converstationStatusType,
              sessionId: sessionId as string,
              keys: currentkey as unknown as string[],
              ContactData: userData as unknown as ContactData,
              setContactData: setUserData,
              updateRequest: statusChange,
              knowledgeBaseId: String(activeWorkspaceId),
              close: () => refPopOver.current?.requestClose(),
            });
          }}
          isActive={userData !== null && userData.status === item.value}
          activeColorCode={item.activeColorCode}
          deactiveColorCode={item.deactiveColorCode}
        />
      ))}
    </Popover>
  );
};
