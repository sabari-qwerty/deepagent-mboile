import { FC } from "react";
import { View } from "react-native";
import { Devider } from "../common/devider";
import { CustomSafeAreaView } from "../container/custom.safe.areya";
import { WorkSpaceHeader } from "../header/work.space.header";

export const WorkSpaceScreen: FC = () => {
  return (
    <CustomSafeAreaView background="blue">
      <View className="flex-1 gap-y-4">
        <WorkSpaceHeader />
      </View>
    </CustomSafeAreaView>
  );
};
