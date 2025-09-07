import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { Text } from "react-native";

export default function Preview() {
  return (
    <CustomSafeAreaView
      background="black"
      className=" bg-black"
    >
      <Text>Preview</Text>
    </CustomSafeAreaView>
  );
}
