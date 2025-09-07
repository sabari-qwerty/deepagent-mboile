import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { PreviewDocument } from "./preview.doument";
import { PreviewImage } from "./preview.image";
import { PreivewViedo } from "./preview.viedo";

export const PreviewRoute: FC = () => {
  const { fileType } = useLocalSearchParams();
  switch (fileType) {
    case "image":
      return <PreviewImage />;
    case "video":
      return <PreivewViedo />;
    case "document":
      return <PreviewDocument />;
    default:
      return null;
  }
};
