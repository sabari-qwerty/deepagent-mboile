import { Devider } from "@/components/common/devider";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { CustomContactData } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Text, View } from "react-native";
import { ProfileTitle } from "./Title";

const ViewedPage: FC = () => {
  const [contactData] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );

  const { data: viewedPage } = useQuery({
    queryKey: ["viewedPage", contactData?.id],
    queryFn: () =>
      services.contact.viewedPage.get({ sessionId: contactData?.id as string }),
    enabled: !!contactData?.id,
  });

  return (
    <View className="gap-y-2">
      <View className="gap-y-2 w-[95%] mx-auto">
        <ProfileTitle name="Viewed Page" icon={<Icons.Eye color="#586474" />} />
        <View className="w-[95%] mx-auto">
          {viewedPage?.map((item, key) => {
            return (
              <View key={key} className="flex flex-col gap-y-0.5 py-1">
                <Text className="text-text-primary">{item.title}</Text>
                <Text className="text-text-secondary" numberOfLines={1}>
                  {item.url}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <Devider />
    </View>
  );
};

export default ViewedPage;
