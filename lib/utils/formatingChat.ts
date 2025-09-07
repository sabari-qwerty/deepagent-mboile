import { MessagesResponse } from "@/types/type";

const systemMessage = ({ text }: { text: string }): MessagesResponse => ({
  id: "",
  sender: "system",
  user_summary: {
    email: null,
    id: null,
    name: null,
    image_url: null,
  },
  blocks: [{ type: "timeStamp", text: text }, []],
  attachments: [],
  timeStamp: new Date().toISOString(),
  seen: true, 
  sessionId: "",
});

export const formatChatMessage = (data: MessagesResponse[]) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const updateMessage: MessagesResponse[] = [];
  const existingLabels = new Set<string>();

  // Sort messages by date (oldest first)
  const sortedMessages = [...data].sort(
    (a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()
  );

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const message of sortedMessages) {
      try {
        const messageDate = new Date(message.timeStamp);
        messageDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
          (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        let label = "";
        if (diffDays === 0) {
          label = "Today";
        } else if (diffDays === 1) {
          label = "Yesterday";
        } else {
          label = new Intl.DateTimeFormat("en-US", {
            timeZone,
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(messageDate);
        }

        if (!existingLabels.has(label)) {
          existingLabels.add(label);
          updateMessage.push(systemMessage({ text: label }));
        }

        updateMessage.push(message);
      } catch (error) {
        console.warn("Error processing message:", error);
        updateMessage.push(message); // Still include the message even if date processing fails
      }
    }
  } catch (error) {
    console.error("Error in formatChatMessage:", error);
    return data; // Return original data if formatting fails
  }

  return updateMessage;
};
