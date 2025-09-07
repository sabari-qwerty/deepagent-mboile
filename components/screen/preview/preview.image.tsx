import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { FC, useEffect, useState } from "react";
import { Dimensions, Image as RNImage, StyleSheet, View } from "react-native";

export const PreviewImage: FC = () => {
  const { url } = useLocalSearchParams();
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    scaledWidth: 0,
    scaledHeight: 0,
  });

  useEffect(() => {
    const screenWidth = Dimensions.get("window").width * 0.95;
    const screenHeight = Dimensions.get("window").height - 80;

    RNImage.getSize(String(url), (width, height) => {
      // Calculate image aspect ratio
      const imageAspectRatio = width / height;
      const screenAspectRatio = screenWidth / screenHeight;

      let finalWidth, finalHeight;

      if (imageAspectRatio > screenAspectRatio) {
        // Image is wider than screen relative to height
        finalWidth = screenWidth;
        finalHeight = screenWidth / imageAspectRatio;
      } else {
        // Image is taller than screen relative to width
        finalHeight = screenHeight;
        finalWidth = screenHeight * imageAspectRatio;
      }

      setImageSize({
        width,
        height,
        scaledWidth: finalWidth,
        scaledHeight: finalHeight,
      });
    });
  }, [url]);
  80;

  return (
    <View className="flex-1 justify-center items-center bg-black ">
      <Image
        style={[
          styles.image,
          {
            width: imageSize.scaledWidth,
            height: imageSize.scaledHeight,
          },
        ]}
        source={String(url)}
        contentFit="contain"
        transition={1000}
        className="flex-1 justify-center items-center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: "transparent",
  },
});
