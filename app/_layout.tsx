import { RootRouter } from "@/components/Router/root";
import { useStorage } from "@/hooks/useStorage";
import { initializeFirebaseMessaging } from "@/lib/utils/firebase-messaging";
import { requestNotificationPermission } from "@/lib/utils/request_preimssion";
import { Storage, StorageKeys } from "@/lib/utils/storage";
import { services } from "@/services";
import { localWorkspace } from "@/types/type";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { AppRegistry } from "react-native";
import "../global.css";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function getFcmToken() {
  const token = await messaging().getToken();

  // TODO: send token to your backend for targeting this device
  return token;
}

async function handleNotificationNavigation({
  message,
  acitveWorkspaceId,
  activeFilter,
  allWorkSpace,
  setActiveFilter,
  setActiveWorkspaceId,
  setAllWorkSpace,
  router,
}: {
  message: FirebaseMessagingTypes.RemoteMessage;
  setActiveWorkspaceId: (workspaceId: string) => void;
  setAllWorkSpace: (allWorkSpace: any) => void;
  setActiveFilter: (activeFilter: any) => void;
  acitveWorkspaceId: string;
  allWorkSpace: any;
  activeFilter: any;
  router: ReturnType<typeof useRouter>;
}) {
  const payload = message.data;

  const { sessionId, workspaceId } = payload as {
    sessionId: string;
    workspaceId: string;
  };

  const allWorkSpaces = (await Storage.get(
    StorageKeys.allWorkspaces
  )) as localWorkspace[];

  const selectWorkspace = allWorkSpaces.filter(
    (workspace) => workspace.id === workspaceId
  );

  if (selectWorkspace.length === 0) {
    try {
      router.replace("/(app)/(session)/workspace");
    } catch (error) {
      console.log({ error });
    }
  }

  await Storage.set(StorageKeys.activeWorkspaceId, selectWorkspace[0].id);
  await Storage.set(StorageKeys.activeWorkspace, selectWorkspace[0]);

  try {
    const chat = await services.contact.chat.get({
      sessionId,
    });

    const data = {
      ...chat.userData,
      platform: chat.platform,
      status: chat.status,
    };

    await Storage.set(StorageKeys.contactData, data);

    router.push({
      pathname: "/(app)/(session)/ChatScreen",
      params: {
        sessionId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export default function RootLayout() {
  const router = useRouter();
  const [acitveWorkspaceId, setActiveWorkspaceId] = useStorage(
    StorageKeys.activeWorkspaceId
  );
  const [allWorkSpace, setAllWorkSpace] = useStorage(StorageKeys.allWorkspaces);
  const [activeFilter, setActiveFilter] = useStorage(StorageKeys.activeFilter);

  useEffect(() => {
    let unsubscribeForeground: () => void;

    (async () => {
      const isEnabled = await requestNotificationPermission();

      if (!isEnabled) {
        console.log("notification permissions not granted");
        return;
      }

      // Initialize Firebase messaging and get token
      const token = await initializeFirebaseMessaging();

      console.log("FCM Token:", token);

      // Handle when app is launched from quit state
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log("App opened from quit state:", initialNotification);
        handleNotificationNavigation({
          message: initialNotification,
          setActiveWorkspaceId,
          setAllWorkSpace,
          setActiveFilter,
          acitveWorkspaceId: acitveWorkspaceId as string,
          allWorkSpace,
          activeFilter,
          router,
        });
      }

      // Handle when app is opened from background state
      messaging().onNotificationOpenedApp((remoteMessage) => {
        if (remoteMessage) {
          console.log("App opened from background state:", remoteMessage);
          handleNotificationNavigation({
            message: remoteMessage,
            setActiveWorkspaceId,
            setAllWorkSpace,
            setActiveFilter,
            acitveWorkspaceId: acitveWorkspaceId as string,
            allWorkSpace,
            activeFilter,
            router,
          });
        }
      });

      // Handle foreground messages
      unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
        if (remoteMessage) {
          console.log("Received foreground message:", remoteMessage);
          await Notifications.scheduleNotificationAsync({
            content: {
              title: remoteMessage.notification?.title || "New Message",
              body: remoteMessage.notification?.body,
              data: remoteMessage.data,
            },
            trigger: null,
          });
        }
      });
    })();

    // Cleanup function
    return () => {
      if (unsubscribeForeground) {
        unsubscribeForeground();
      }
    };
  }, []); // Empty dependency array to run only once
  return <RootRouter />;
}

AppRegistry.registerComponent("main", () => RootLayout);
