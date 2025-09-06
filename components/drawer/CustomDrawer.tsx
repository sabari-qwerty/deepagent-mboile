import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FC } from "react";
import { View } from "react-native";
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

  return (
    <CustomSafeAreaView background="blue" className="flex-1  ">
      <CustomDrawerHeader />
      <View className="flex-1 ">
        <DrawerFlatList close={close} />
      </View>
      <View className="py-4 border-t  border-border-primary">
        <LogoutButton close={close} />
      </View>
    </CustomSafeAreaView>
  );
};
