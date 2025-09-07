import { UserInfoCard } from "@/components/card/userInfoCard";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { CustomContactData } from "@/types/type";
import { FC } from "react";
import { View } from "react-native";

const color = "#586474";

const USER_DATA_FIELDS = [
  {
    key: "name",
    label: "Name",
    icon: () => <Icons.UserIcon color={color} width={16} height={16} />,
  },
  {
    key: "type",
    label: "Type",
    icon: () => <Icons.UserIcon color={color} width={16} height={16} />,
  },
  {
    key: "ip",
    label: "IP Address",
    icon: () => <Icons.Target color={color} size={16} />,
  },
  {
    key: "asOrganization",
    label: "asOrganization",
    icon: () => <Icons.OrganizationIcon color={color} size={14} />,
  },
  {
    key: "timezone",
    label: "Time Zone",
    icon: () => <Icons.ClockIcon color={color} size={14} />,
  },
  {
    key: "region",
    label: "Location",
    icon: () => <Icons.LocationIcon color={color} size={18} />,
  },
  {
    key: "city",
    label: "City",
    icon: () => <Icons.CityIcon color={color} size={14} />,
  },
  {
    key: "country",
    label: "Country",
    icon: () => <Icons.GlobeIcon color={color} size={14} />,
  },
  {
    key: "latitude",
    label: "Latitude",
    icon: () => <Icons.latitude color={color} size={14} />,
  },
  {
    key: "longitude",
    label: "Longitude",
    icon: () => <Icons.longitude color={color} size={14} />,
  },
  {
    key: "continent",
    label: "Continent",
    icon: () => <Icons.continent color={color} size={14} />,
  },
];

export const UserInfo: FC = () => {
  const [userData] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );
  return (
    <View className="gap-y-2">
      {USER_DATA_FIELDS.map(
        (item, index) =>
          userData && (
            <UserInfoCard
              key={index}
              icon={item.icon()}
              label={item.label}
              value={userData[item.key as keyof CustomContactData] as string}
            />
          )
      )}
    </View>
  );
};
