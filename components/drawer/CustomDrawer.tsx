import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FC } from "react";
import { View } from "react-native";
import { LogoutButton } from "../button/logout.button";
import { CustomSafeAreaView } from "../container/custom.safe.areya";

export const CustomDrawer: FC<DrawerContentComponentProps> = ({
  navigation,
  ...props
}) => {
  const close = () => {
    navigation.closeDrawer();
  };

  return (
    <CustomSafeAreaView background="blue" className="flex-1  ">
      <View className="flex-1 "></View>
      <View className="py-2 border-t  border-border-primary">
        <LogoutButton close={close} />
      </View>
    </CustomSafeAreaView>
  );
};
