import endpoints from "@/api/endpoints";
import api from "@/axios";
import { formatChatMessage } from "@/lib/utils/formatingChat";
import { ChatSession, MessagesResponse } from "@/types/type";

const getChat = async ({
  sessionId,
}: {
  sessionId: string;
}): Promise<ChatSession> => {
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
};

export default getChat;
