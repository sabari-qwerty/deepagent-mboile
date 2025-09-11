import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FC, ReactNode } from "react";

interface CustomBottomSheetProp {
  ref: React.Ref<BottomSheetMethods>;
  children: ReactNode;
  snapPoints: string[] | [];
}
export const CustomBottomSheet: FC<CustomBottomSheetProp> = ({
  ref,
  children,
  snapPoints,
}) => {
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleStyle={{
        display: "none",
      }}
      backgroundStyle={{
        backgroundColor: "#00000020",
      }}
    >
      {children}
    </BottomSheet>
  );
};
