import * as DocumentPicker from "expo-document-picker";
import { ToastAndroid } from "react-native";

export const fileUpload = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*", "video/mp4"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    if (file.size && file.size > 3 * 1024 * 1024) {
      ToastAndroid.show("File size is too large", ToastAndroid.SHORT);
      return;
    }

    return {
      url: file.uri,
      type: file.mimeType || "application/octet-stream",
      title: file.name,
      fileType: file.mimeType?.includes("pdf")
        ? "document"
        : file.mimeType?.includes("video")
        ? "video"
        : "image",
    };
  } catch (error) {
    ToastAndroid.show("Upload failed", ToastAndroid.SHORT);
    return null;
  }
};
