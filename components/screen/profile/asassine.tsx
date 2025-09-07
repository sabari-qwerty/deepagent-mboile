import { CustomSwitch } from "@/components/util/switch";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { queryClient } from "@/tanstack-query";
import {
  ChangeAssigneePayload,
  ChatSession,
  CustomContactData,
  Team,
} from "@/types/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { Image, Text, ToastAndroid, View } from "react-native";
import { ProfileTitle } from "./Title";

export const MakeAsAssignee: FC = () => {
  const { sessionId } = useLocalSearchParams();
  const [teamId] = useStorage(StorageKeys.teamId);
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);
  const [assignee, setAssignee] = useStorage(StorageKeys.assignee);
  const [contactData] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );

  const { data: assingeeData } = useQuery({
    queryKey: ["assignee", teamId, activeWorkspaceId],
    queryFn: () =>
      services.contact.assignee.get({
        teamId: teamId as string,
        knowledgeBaseId: activeWorkspaceId as string,
      }),

    enabled: !!teamId && !!activeWorkspaceId,
  });

  const { mutate: updateAssigneeMutation } = useMutation({
    mutationFn: (payload: ChangeAssigneePayload) =>
      services.contact.assignee.update(payload),

    onSuccess: () => {
      ToastAndroid.show("Assignee updated", ToastAndroid.SHORT);
    },
  });

  const handleAssigneeUpdate = (payload: ChangeAssigneePayload) => {
    const { sessionId } = payload;
    updateAssigneeMutation(payload);
    setAssignee(payload.email);

    const queryData = queryClient.getQueryData([
      "chat",
      sessionId,
    ]) as ChatSession;

    queryData.assignedPerson = payload.email;

    queryClient.setQueryData(["chat", sessionId], queryData);
  };

  return (
    <View className="gap-y-2">
      <View className="gap-y-2 w-[95%] mx-auto">
        <ProfileTitle
          name="Make as Assingee"
          icon={<Icons.Assingee color="#586474" />}
        />

        {assingeeData &&
          (assingeeData as unknown as Team[]) &&
          (assingeeData as unknown as Team[]).map((item: Team, key: number) => {
            const isAssigned = item.tenants.email === assignee;

            console.log(assignee);
            return (
              <View
                key={key}
                className="flex flex-row gap-x-2 items-center justify-between"
              >
                <View className="flex flex-row gap-x-2 items-center">
                  <Image
                    source={{ uri: item.tenants.avatar_url ?? "" }}
                    className="w-9 h-9 rounded-full"
                  />

                  <Text className="text-lg font-medium text-text-primary">
                    {item.tenants.name}
                  </Text>
                </View>
                <View>
                  <CustomSwitch
                    value={isAssigned}
                    onValueChange={() => {
                      handleAssigneeUpdate({
                        email: item.tenants.email,
                        teamId: item.teamId,
                        userId: item.teamMemberId,
                        knowledgeBaseId: activeWorkspaceId as string,
                        sessionId: sessionId as string,
                      });
                    }}
                    activeColor="#2563eb"
                    inactiveColor="#E0E0E0"
                    thumbColor="#fff"
                    disabled={item.tenants.email === String(assignee)}
                    width={45}
                    height={23}
                    thumbSize={17}
                  />
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};
