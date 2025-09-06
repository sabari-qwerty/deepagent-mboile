import { conversationFilter, converstationStatus } from "@/constants/filter";
import {
  conversationFilterType,
  converstationStatusType,
  StatusOverViewResponse,
} from "@/types/type";
import BottomSheet from "@gorhom/bottom-sheet";
import { FC } from "react";
import { FilterCard } from "../card/Filter.card";
import { CustomBottomSheet } from "./sheet";
import { CustomBottomSheetView } from "./view";

type bottomSheet = "status" | "gobalFilter" | "";

interface FilterSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  snapPoints: string[];
  close: () => void;
  bottomSheet: bottomSheet;
  data: StatusOverViewResponse;
  gloableFilterData: conversationFilterType;
  statusFilterData: converstationStatusType;
  setGloableFilterData: (data: conversationFilterType) => void;
  setStatusFilterData: (data: converstationStatusType) => void;
}

export const FilterSheet: FC<FilterSheetProps> = ({
  bottomSheetRef,
  snapPoints,
  close,
  bottomSheet,
  data,
  gloableFilterData,
  statusFilterData,
  setGloableFilterData,
  setStatusFilterData,
}) => {
  return (
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      <CustomBottomSheetView handleClose={close}>
        {bottomSheet === "gobalFilter" && (
          <FilterCard
            options={conversationFilter}
            onPress={(value) => {
              setGloableFilterData(value as conversationFilterType);
              close();
            }}
            active={gloableFilterData}
            data={data}
            showCount={true}
          />
        )}

        {bottomSheet === "status" && (
          <FilterCard
            options={converstationStatus}
            onPress={(value) => {
              setStatusFilterData(value as converstationStatusType);
              close();
            }}
            active={statusFilterData}
            data={data}
            showCount={false}
          />
        )}
      </CustomBottomSheetView>
    </CustomBottomSheet>
  );
};
