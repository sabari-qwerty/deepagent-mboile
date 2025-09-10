import { config } from "@/config";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isChangeingWorkSpace: boolean;
  setIsChangeingWorkSpace: (value: boolean) => void;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isChangeingWorkSpace: false,
  setIsChangeingWorkSpace: () => {},
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [accessToken] = useStorage<string>(StorageKeys.accessToken);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [isChangeingWorkSpace, setIsChangeingWorkSpace] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    // Initialize socket with access token
    const newSocket = io(config.BackendUrl, {
      autoConnect: false,
      withCredentials: true,
      extraHeaders: {
        Authorization: String(accessToken),
      },
    });

    console.log({ accessToken });

    // Socket event listeners
    newSocket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    // Connect the socket
    newSocket.connect();

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        newSocket.removeAllListeners();
      }
    };
  }, [accessToken]);

  useEffect(() => {
    setTimeout(() => {
      setIsChangeingWorkSpace(false);
    }, 1000);
  }, [isChangeingWorkSpace]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        isChangeingWorkSpace,
        setIsChangeingWorkSpace,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
``;
