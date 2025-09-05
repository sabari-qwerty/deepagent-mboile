import { Image } from "expo-image";
import { FC } from "react";

interface props {
  imageUrl: string;
}

export const FallBackImage: FC<props> = ({ imageUrl }) => {
  return (
    <Image
      style={{ width: "100%", height: "100%" }}
      placeholder={require("@/assets/images/error-404.png")}
      source={
        imageUrl ? { uri: imageUrl } : require("@/assets/images/error-404.png")
      }
      contentFit="cover"
      transition={200}
      onError={(error) => {
        console.log("Image loading error:", error);
      }}
    />
  );
};
