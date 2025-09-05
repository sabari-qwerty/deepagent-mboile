import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FC } from "react";
import { CustomSafeAreaView } from "../container/custom.safe.areya";

export const CustomDrawer: FC<DrawerContentComponentProps> = ({
  navigation,
  ...props
}) => {
  return (
    <CustomSafeAreaView background="blue" className="flex-1  bg-black">
      <></>
    </CustomSafeAreaView>
  );
};
