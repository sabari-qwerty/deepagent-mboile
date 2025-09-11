import api from "@/axios";

interface prop {
  sessionId: string;
  chatId: string;
  imageId: string | undefined;
}

export const DeleteMessage = async ({ sessionId, chatId, imageId }: prop) => {
  try {
    return await api.delete(
      `/live/agent/${sessionId}/${chatId}?imageId=${imageId}`
    );
  } catch (error) {
    throw error;
  }
};
