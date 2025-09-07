import { ChatList } from "@/components/chat/chat.list";
import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ChatHeader } from "@/components/header/chat.header";
import { FC } from "react";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const ChatScreen: FC = () => {
  return (
    <CustomSafeAreaView background="blue" className="flex-1 bg-white ">
      <KeyboardAvoidingView
        behavior={"padding"}
        className="flex-1 w-full h-full"
      >
        <ChatHeader />
        <ChatList />
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default ChatScreen;
