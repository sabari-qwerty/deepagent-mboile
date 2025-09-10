import { RootRouter } from "@/components/Router/root";
import { initializeFirebaseMessaging } from "@/lib/utils/firebase-messaging";
import { requestNotificationPermission } from "@/lib/utils/request_preimssion";
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

function handleNotificationNavigation(
  message: FirebaseMessagingTypes.RemoteMessage
) {
  const router = useRouter();
  const screen = message.data?.screen;

  if (screen) {
    router.push(screen as any);
  }
}

export default function RootLayout() {
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
        handleNotificationNavigation(initialNotification);
      }

      // Handle when app is opened from background state
      messaging().onNotificationOpenedApp((remoteMessage) => {
        if (remoteMessage) {
          console.log("App opened from background state:", remoteMessage);
          handleNotificationNavigation(remoteMessage);
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
