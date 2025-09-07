import { Icons } from "@/constants/icons";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { FC } from "react";
import { Text, View } from "react-native";

export const PreviewDocument: FC = () => {
  const { title, fileExtension, url } = useLocalSearchParams();

  return (
    <View className="flex-1  w-full h-full items-center justify-center">
      <View className="items-center  justify-center gap-y-2">
        {fileExtension === "pdf" || url?.includes(".pdf") ? (
          <Icons.PDFIcon color="#fff" size={120} />
        ) : (
          <Icons.Document color="#fff" size={120} />
        )}
        <View className="flex-row gap-x-2">
          <Text className="font-bold text-white ">
            {title}.{fileExtension}
          </Text>
        </View>
      </View>
    </View>
  );
};
