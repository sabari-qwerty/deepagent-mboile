import { CustomOnLongPress, CustomOnPress } from "@/actions/handle/handle.message.select";
import { MessagesResponse } from "@/types/type";
import { FC, ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { value } from "../provider/chat.screen.provider";

interface CuttomButtonForCahtBabuleProps {
  item: MessagesResponse;
  message: value;
  setMessage: (value: value) => void;
  children: ReactNode;
  url: string;
}

export const CuttomButtonForCahtBabule: FC<CuttomButtonForCahtBabuleProps> = ({
  children,
  message,
  setMessage,
  item,
  url = "",
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        CustomOnPress({
          item,
          message,
          setMessage,
          url,
        })
      }
      onLongPress={() =>
        CustomOnLongPress({
          item,
          message,
          setMessage,
        })
      }
      className="w-[240px]"
    >
      {children}
    </TouchableOpacity>
  );
};
