import { Children } from "@/types/type";
import { createContext, FC, useState } from "react";

interface valueObject {
  chatId: string;
  imageId: string | undefined;
  isText?: boolean;
}

export interface value {
  [key: string]: valueObject;
}

export interface ChatScreenContextProp {
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  messages: value;
  setMessages: (messages: value) => void;
}

export const ChatScreenContext = createContext<
  ChatScreenContextProp | undefined
>(undefined);

export const CahtScreenProvider: FC<Children> = ({ children }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<value>({});

  return (
    <ChatScreenContext.Provider
      value={{
        isTyping,
        setIsTyping,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatScreenContext.Provider>
  );
};
