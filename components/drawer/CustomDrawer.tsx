import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import * as Clipboard from "expo-clipboard";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LogoutButton } from "../button/logout.button";
import { CustomSafeAreaView } from "../container/custom.safe.areya";
import { DrawerFlatList } from "../FlatList/darwer.flat.list";
import { CustomDrawerHeader } from "../header/custom.drawer.header";

export const CustomDrawer: FC<DrawerContentComponentProps> = ({
  navigation,
  ...props
}) => {
  const close = () => {
    navigation.closeDrawer();
  };

  const [fcmToken, setFcmToken] = useStorage(StorageKeys.fcmToken);


  
  console.log('\n');
  console.log('\n');
  console.log('\n');


  console.log({ fcmToken });

  console.log('\n');
  console.log('\n');
  console.log('\n');

  return (
    <CustomSafeAreaView background="blue" className="flex-1  ">
      <CustomDrawerHeader close={close} />
      <View className="flex-1 ">
        <DrawerFlatList close={close} />
      </View>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setStringAsync(fcmToken as string);
        }}
        className="py-2 bg-black"
      >
        <Text className="text-primary">{fcmToken as string} he</Text>
      </TouchableOpacity>

      <View className="py-4 border-t  border-border-primary">
        <LogoutButton close={close} />
      </View>
    </CustomSafeAreaView>
  );
};
