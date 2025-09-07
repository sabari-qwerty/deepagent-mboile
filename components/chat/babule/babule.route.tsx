import { shadowStyles } from "@/components/header/contact.header";
import { Icons } from "@/constants/icons";
import { cn } from "@/lib/utils/cn";
import { DateAndtime } from "@/lib/utils/time";
import { MessagesResponse } from "@/types/type";
import { FC } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface prop {
  item: MessagesResponse;
}

export const BabuleRoute: FC<prop> = ({ item }) => {
  return (
    <View className={` w-full mx-auto  relative `}>
      <View
        className={`${
          item.sender === "user" ? "justify-start" : "justify-end"
        } w-[95%] mx-auto  ${item.sender === "system" && "justify-center"}`}
      >
        <Pressable
          className="w-full py-2 "
          disabled={
            item.sender === "system" ||
            item.sender === "bot" ||
            item.sender === "user"
          }
          onPress={() => console.log("pressed")}
          onLongPress={() => console.log("long pressed")}
        >
          <View
            className={cn(
              `max-w-[260px] min-w-[60px] px-3 py-2 ${
                item.blocks[0].text !== "" && "pb-4"
              }  ${
                item.attachments &&
                item.attachments.length > 0 &&
                item.attachments[0].fileType === "document"
                  ? "pb-4"
                  : "pb-6"
              } rounded-md relative ${
                item.sender === "user"
                  ? "bg-white self-start rounded-bl-none"
                  : "bg-primary self-end rounded-br-none"
              } ${
                item.sender === "system" && "bg-transparent w-full max-w-full "
              }`
            )}
            style={item.sender === "user" && shadowStyles.shadowBox}
          >
            {item.sender !== "system" && (
              <View className="absolute bottom-[4px] right-2 flex-row items-center gap-1">
                <Text
                  className={`${
                    item.sender === "user" ? "text-text-primary" : "text-white"
                  } text-[7px]`}
                >
                  {DateAndtime({ timeStamp: item.timeStamp })}
                </Text>

                {item.isNowAdded && item.blocks[0].text === "" && (
                  <ActivityIndicator color={"#fff"} size={12} />
                )}

                {item.sender !== "user" && !item.isNowAdded && item.seen && (
                  <Icons.DubleTickIcon color={"#fff"} />
                )}
                {item.sender !== "user" && !item.isNowAdded && !item.seen && (
                  <Icons.SingleTickIcon color="#fff" />
                )}
              </View>
            )}
          </View>
        </Pressable>
      </View>
      {false && (
        <Pressable
          onPress={() => console.log("pressed")}
          className="w-full absolute top-0  h-full bg-primary/20"
        ></Pressable>
      )}
    </View>
  );
};
