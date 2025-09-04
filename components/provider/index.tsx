import { Children } from "@/types/type";
import { FC } from "react";
import { AuthProvider } from "./Auth";

const Provider: FC<Children> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Provider;
