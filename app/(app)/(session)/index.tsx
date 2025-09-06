import { CustomSafeAreaView } from "@/components/container/custom.safe.areya";
import { ContactHeader } from "@/components/header/contact.header";
import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { FC } from "react";

const ChatScreen: FC = () => {
  const { open } = useDrawer();
  const { handleLogout } = useAuth();
  return (
    <CustomSafeAreaView className="bg-white gap-y-4">
      <ContactHeader />

    </CustomSafeAreaView>
  );
};

export default ChatScreen;
