import { UserInfoCard } from "@/components/card/userInfoCard";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { CustomContactData } from "@/types/type";
import { FC } from "react";
import { View } from "react-native";

export const ProfileContact: FC = () => {
  const [CustomProfileData] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );
  return (
    <View className="gap-y-2 ">
      <View className="gap-y-2 w-[95%] mx-auto py-2">
        <View>
          
        </View>
      </View>
    </View>
  );
};
