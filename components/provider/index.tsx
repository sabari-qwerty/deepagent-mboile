import { Children } from "@/types/type";
import { FC } from "react";
import { AuthProvider } from "./Auth";
import { QueryProvider } from "./query";

const Provider: FC<Children> = ({ children }) => {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
};

export default Provider;
