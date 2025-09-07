import { Children } from "@/types/type";
import { FC } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AuthProvider } from "./Auth";
import { QueryProvider } from "./query";
import { SocketProvider } from "./socket";

const Provider: FC<Children> = ({ children }) => {
  return (
    <KeyboardProvider>
      <SocketProvider>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </SocketProvider>
    </KeyboardProvider>
  );
};

export default Provider;
