import { ChatList } from "@/components/chat/chat.list";
import { ChatHeader } from "@/components/header/chat.header";
import { CahtScreenProvider } from "@/components/provider/chat.screen.provider";
import SendMessage from "@/components/screen/chat/message";
import { FC } from "react";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen: FC = () => {
  return (
    <CahtScreenProvider>
      <StatusBar
        animated={true}
        backgroundColor="#0048e6"
        barStyle="light-content"
        translucent={true}
      />
      <SafeAreaView className="flex-1  w-full h-full bg-white">
        <KeyboardAvoidingView behavior={"padding"} className="flex-1 ">
          <ChatHeader isNavigate={true} />
          <ChatList />
          <SendMessage />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </CahtScreenProvider>
  );
};

export default ChatScreen;
