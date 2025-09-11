import endpoints from "@/api/endpoints";
import api from "@/axios";
import { formatChatMessage } from "@/lib/utils/formatingChat";
import { ChatSession } from "@/types/type";

const getChat = async ({
  sessionId,
}: {
  sessionId: string;
}): Promise<ChatSession> => {
  try {
    const response = (
      await api.get(endpoints.getAllContactChat, {
        params: {
          sessionId: sessionId,
        },
      })
    ).data;

    const messages = formatChatMessage(response.messages);

    return {
      ...response,
      messages,
    };
  } catch (error) {
    throw error;
  }
};

export default getChat;
