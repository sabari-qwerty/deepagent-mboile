import { queryClient } from "@/tanstack-query";
import { ChatSession, MessagesResponse } from "@/types/type";

interface prop {
  message: string;
  sessionId: string;
  file: any;
  id: string;
}

export const TempChat = ({ message, sessionId, file, id }: prop) => {
  const keys = ["chat", sessionId];
  const ChatData = queryClient.getQueryData(keys) as ChatSession;

  const newChat = {
    id: id,
    sender: "agent",
    agent_summary: {
      email: "",
      id: "",
      name: "",
      image_url: "",
    },
    blocks: [
      {
        type: "paragraph",
        text: "",
      },
      [] as { url: string; title: string }[],
    ],
    attachments: [] as any[],
    timeStamp: new Date().toISOString(),
    seen: false,
    isNowAdded: true,
    sessionId: sessionId,
    user_summary: {
      email: "",
      id: "",
      name: "",
      image_url: "",
    },
    sources: [],
  } as MessagesResponse;

  if (message !== "" && String(message).trim() !== "" && !file) {
    newChat.blocks[0].text = message;
  }

  if (file) {
    newChat.attachments = [
      {
        url: file.uri,
        title: file.name,
        fileExtension: file.fileExtension,
        fileType: file.fileType,
      },
    ];
  }

  queryClient.setQueryData(keys, {
    ...ChatData,
    messages: [...ChatData.messages, newChat],
  });
};
