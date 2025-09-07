import { FC, useState } from "react";
import { Image, View } from "react-native";

interface props {
  imageUrl: string;
}

export const ResizeImage: FC<props> = ({ imageUrl }) => {
  const [isVertical, setIsVertical] = useState<null | boolean>(null);

  Image.getSize(imageUrl, (width, height) => {
    setIsVertical(width < height);
  });

  return (
    <View
      className={`w-[240px] ${
        isVertical ? "h-[240px]" : "h-[135px]"
      } bg-black rounded-md`}
    >
      <Image source={{ uri: imageUrl }} className="w-full h-full rounded-md" />
    </View>
  );
};
