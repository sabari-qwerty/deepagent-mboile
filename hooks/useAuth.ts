import { config } from "@/config";
import { Storage, StorageKeys } from "@/lib/utils/storage";
import { useAuth0 } from "react-native-auth0";
import { useStorage } from "./useStorage";

interface handleLoginProps {
  setValue: (value: boolean) => void;
}

export const useAuth = () => {
  const { authorize, error, isLoading, user, clearSession } = useAuth0();
  const [accessToken, setAccessToken] = useStorage(StorageKeys.accessToken);
  const [allWorkspaces, setAllWorkspaces] = useStorage(
    StorageKeys.allWorkspaces
  );
  const [activeWorkspace, setActiveWorkspace] = useStorage(
    StorageKeys.activeWorkspace
  );
  const [activeWorkspaceId, setActiveWorkspaceId] = useStorage(
    StorageKeys.activeWorkspaceId
  );

  const handleLogin = async ({ setValue }: handleLoginProps) => {
    try {
      setValue(true);

      const authorizeData = await authorize({
        audience: config.AuthAudience,
      });

      if (!authorizeData) {
        await clearSession();
        return;
      }

      const { accessToken } = authorizeData;
      setAccessToken(accessToken);
      setTimeout(() => {
        setValue(false);
      }, 500);
    } catch (error) {
      setValue(false);
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await clearSession();
    await Storage.clear();
    setAccessToken(null);
    setAllWorkspaces(null);
    setActiveWorkspace(null);
    setActiveWorkspaceId(null);
  };

  return {
    user,
    handleLogin,
    isLoading,
    error,
    handleLogout,
  };
};
