// utils/openFile.js
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

// File type mapping
const fileTypeMap = {
  pdf: { mime: "application/pdf", uti: "com.adobe.pdf" },
  doc: { mime: "application/msword", uti: "com.microsoft.word.doc" },
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    uti: "org.openxmlformats.wordprocessingml.document",
  },
  xls: { mime: "application/vnd.ms-excel", uti: "com.microsoft.excel.xls" },
  xlsx: {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uti: "org.openxmlformats.spreadsheetml.sheet",
  },
  ppt: {
    mime: "application/vnd.ms-powerpoint",
    uti: "com.microsoft.powerpoint.ppt",
  },
  pptx: {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    uti: "org.openxmlformats.presentationml.presentation",
  },
  jpg: { mime: "image/jpeg", uti: "public.jpeg" },
  jpeg: { mime: "image/jpeg", uti: "public.jpeg" },
  png: { mime: "image/png", uti: "public.png" },
  txt: { mime: "text/plain", uti: "public.plain-text" },
  mp4: { mime: "video/mp4", uti: "public.mpeg-4" },
  mov: { mime: "video/quicktime", uti: "com.apple.quicktime-movie" },
  avi: { mime: "video/x-msvideo", uti: "public.avi" },
  mkv: { mime: "video/x-matroska", uti: "org.matroska.mkv" },
};

export type FileExtension = keyof typeof fileTypeMap;

interface prop {
  fileUri: string;
  extions: FileExtension;
}

export async function openFile({ fileUri, extions }: prop) {
  try {
    const fileType = fileTypeMap[extions];

    if (fileUri.startsWith("file://")) {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        return;
      }

      try {
        const contentUri = await FileSystem.getContentUriAsync(fileUri);
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          type: fileType.mime,
          flags: 1, // grant read permission
        });
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (!fileType) {
      alert("Unsupported file type: " + extions);
      return;
    }

    if (Platform.OS === "android") {
      // Open with relevant app
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: fileUri,
        type: fileType.mime,
        flags: 1,
      });
    } else if (Platform.OS === "ios") {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          UTI: fileType.uti,
          mimeType: fileType.mime,
        });
      } else {
        alert("Sharing not available on this device");
      }
    } else {
      // Web fallback
      window.open(fileUri, "_blank");
    }
  } catch (error) {
    console.error("Error opening file:", error);
  }
}
