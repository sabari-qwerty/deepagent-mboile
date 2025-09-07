import { value } from "@/components/provider/chat.screen.provider";
import { services } from "@/services";
import { queryClient } from "@/tanstack-query";
import { ChatSession } from "@/types/type";
import pLimit from "p-limit";

export interface handleDeletePayload {
  messages: value;
  sessionId: string;
  setMessages: (messages: value) => void;
}

export const handleDelete = async ({
  messages,
  sessionId,
  setMessages,
}: handleDeletePayload) => {
  if (!messages) throw new Error("message or imageId is required");

  const limit = pLimit(3);

  const promises = Object.keys(messages).map((data) =>
    limit(() =>
      services.contact.chat.delete({
        chatId: messages[data].chatId,
        imageId: messages[data].imageId,
        sessionId: String(sessionId),
      })
    )
  );

  const keys = ["chat", sessionId];

  const chatMessageData = queryClient.getQueryData(keys) as ChatSession;

  const newChatMessageData = chatMessageData.messages.filter(
    (data) => !(data.id in messages)
  );

  queryClient.setQueryData(keys, {
    ...chatMessageData,
    messages: newChatMessageData,
  });

  setMessages({});
  return Promise.all(promises);
};
