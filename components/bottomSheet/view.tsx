import { cn } from "@/lib/utils/cn";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, ReactNode, useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomBottomViewProp {
  handleClose: () => void;
  children: ReactNode;
  className?: string;
}
export const CustomBottomSheetView: FC<CustomBottomViewProp> = ({
  handleClose,
  children,
  className,
}) => {
  const viewRef = useRef<View>(null);
  return (
    <BottomSheetView className="flex w-full h-full ">
      <SafeAreaView className="  flex-1 w-full h-full ">
        <View
          className={cn(` w-full mx-auto h-full  justify-end  `)}
          onTouchStart={(e) => {
            const touch = e.nativeEvent;

            viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
              const touchX = touch.pageX;
              const touchY = touch.pageY;
              if (
                touchX < pageX ||
                touchX > pageX + width ||
                touchY < pageY ||
                touchY > pageY + height
              ) {
                handleClose();
              }
            });
          }}
        >
          <View
            ref={viewRef}
            className="w-full h-fit "
            style={{
              backgroundColor: "black",
            }}
          >
            {children}
          </View>
        </View>
      </SafeAreaView>
    </BottomSheetView>
  );
};
