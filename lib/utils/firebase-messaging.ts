import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Storage, StorageKeys } from "./storage";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  try {
    // Check if we have permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log("Failed to get push token for push notification!");
      return;
    }

    // Get the FCM token
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting push token:", error);
  }
}

export async function setupBackgroundHandler() {
  // Register background handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);

    // Convert Firebase message to Expo notification format

    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title || "New Message",
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
      },
      trigger: null, // Deliver immediately
    });
  });

  // Handle notifications when app is in foreground
  messaging().onMessage(async (remoteMessage) => {
    console.log("Received foreground message:", remoteMessage);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title || "New Message",
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
      },
      trigger: null,
    });
  });
}

// Function to initialize Firebase messaging
export async function initializeFirebaseMessaging() {
  if (Platform.OS === "ios") {
    // Request iOS permissions
    await messaging().requestPermission();
    await messaging().registerDeviceForRemoteMessages();
  }

  // Setup handlers
  await setupBackgroundHandler();

  // Get the token
  const token = await registerForPushNotificationsAsync();
  await Storage.set(StorageKeys.fcmToken, token);

  return token;
}
