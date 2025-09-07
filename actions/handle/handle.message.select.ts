import { value } from "@/components/provider/chat.screen.provider";
import { MessagesResponse } from "@/types/type";
import { router } from "expo-router";

interface prop {
  item: MessagesResponse;
  message: value;
  setMessage: (value: value) => void;
}

const handleAddMessage = ({ item, message, setMessage }: prop) => {
  setMessage({
    ...message,
    [item.id]: {
      chatId: item.id,
      imageId:
        item.attachments &&
        item.attachments.length > 0 &&
        item.attachments[0].fileType === "image"
          ? item.attachments[0].url.split("/").pop()
          : undefined,
      isText: item.blocks[0].text && item.blocks[0].text !== "" ? true : false,
    },
  });
};

const handleRemoveMessage = ({ item, message, setMessage }: prop) => {
  if (message[item.id]) {
    delete message[item.id];
    setMessage({ ...message });
  }
};

export const handleMessageSelect = ({ item, message, setMessage }: prop) => {
  if (!message[item.id]) {
    handleAddMessage({ item, message, setMessage });
  } else {
    handleRemoveMessage({ item, message, setMessage });
  }
};

interface CustomOnPrssProps extends prop {
  url?: string;
}

export const CustomOnPress = ({
  item,
  message,
  setMessage,
  url,
}: CustomOnPrssProps) => {
  if (url !== "" && url && Object.keys(message).length === 0) {
    console.log("hello world");
    router.push({
      pathname: url as any,
      params: {
        url: item.attachments[0].url,
        title: item.attachments[0].title,
        timeStamp: item.timeStamp,
        fileType: item.attachments[0].fileType,
        fileExtension: item.attachments[0].fileExtension,
      },
    });
    return;
  }

  if (
    Object.keys(message).length !== 0 &&
    item.sender !== "user" &&
    item.sender !== "system" &&
    item.sender !== "bot"
  ) {
    handleMessageSelect({ item, message, setMessage });
    return;
  } else {
    if (
      Object.keys(message).length !== 0 &&
      item.sender !== "user" &&
      item.sender !== "system" &&
      item.sender !== "bot"
    )
      handleMessageSelect({ item, message, setMessage });
  }
};

export const CustomOnLongPress = ({ item, message, setMessage }: prop) => {
  if (
    Object.keys(message).length === 0 &&
    item.sender !== "user" &&
    item.sender !== "system" &&
    item.sender !== "bot"
  ) {
    handleMessageSelect({ item, message, setMessage });
  }
};
