import { Icons } from "@/constants/icons";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { createThumbnail } from "react-native-create-thumbnail";
import { ResizeImage } from "./resize.image";

interface props {
  url: string;
}

export const ViedoThumbnail: FC<props> = ({ url }) => {
  const [imgUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    createThumbnail({
      url,
      timeStamp: 1000,
    })
      .then((res) => {
        setImageUrl(res.path);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return (
    <View className="w-fit  relative  ">
      <ResizeImage imageUrl={imgUrl ?? ""} />

      <View className="absolute top-0 left-0 w-full h-full rounded-md  items-center justify-center">
        <Icons.PlayButtonIcon color="#fff" />
      </View>
    </View>
  );
};
