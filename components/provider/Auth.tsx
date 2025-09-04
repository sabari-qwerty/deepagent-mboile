import { config } from "@/config";
import { Children } from "@/types/type";
import { FC } from "react";
import { Auth0Provider } from "react-native-auth0";

export const AuthProvider: FC<Children> = ({ children }) => {
  return (
    <Auth0Provider domain={config.AuthDomain} clientId={config.AuthClientID}>
      {children}
    </Auth0Provider>
  );
};
