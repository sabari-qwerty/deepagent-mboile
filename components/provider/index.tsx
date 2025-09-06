import { Children } from "@/types/type";
import { FC } from "react";
import { AuthProvider } from "./Auth";
import { QueryProvider } from "./query";
import { SocketProvider } from "./socket";

const Provider: FC<Children> = ({ children }) => {
  return (
    <SocketProvider>
      <AuthProvider>
        <QueryProvider>{children}</QueryProvider>
      </AuthProvider>
    </SocketProvider>
  );
};

export default Provider;
