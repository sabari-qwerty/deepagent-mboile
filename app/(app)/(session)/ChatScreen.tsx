import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ChatHeader } from "@/components/header/chat.header";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { FC } from "react";

const ChatScreen: FC = () => {
  const [currentContact, setCurrentContact] = useStorage(
    StorageKeys.contactData
  );
  console.log("\n");
  console.log("\n");
  console.log("\n");

  console.log({
    currentContact,
  });

  console.log("\n");
  console.log("\n");
  console.log("\n");

  return (
    <CustomSafeAreaView background="blue" className="flex-1 bg-white ">
      <ChatHeader />
    </CustomSafeAreaView>
  );
};

export default ChatScreen;
