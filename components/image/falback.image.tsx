import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { FC, useState } from "react";

interface props {
  imageUrl: string;
}

export const FallBackImage: FC<props> = ({ imageUrl }) => {
  const [isError, setIsError] = useState<boolean>(false);

  useFocusEffect(() => {
    if (isError) {
      setIsError(false);
    }
  });

  return (
    <Image
      style={{ width: "100%", height: "100%" }}
      placeholder={require("@/assets/images/error-404.png")}
      source={
        isError ? require("@/assets/images/error-404.png") : { uri: imageUrl }
      }
      contentFit="cover"
      transition={200}
      onError={(error) => {
        setIsError(true);
      }}
    />
  );
};
