import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { OSNotification, OneSignal } from "react-native-onesignal";
import { NotificationEventTypeMap } from "react-native-onesignal/dist/models/NotificationEvents";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { oneSignalInitialize } from "./src/libs/onesignal";
import { Notification } from "./src/components/Notification";

export default function App() {
  const [notification, setNotification] = useState<OSNotification | null>();
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    oneSignalInitialize()
  }, [])

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('foregroundWillDisplay', (notificationReceivedEvent: NotificationEventTypeMap['foregroundWillDisplay']) => {
      const response = notificationReceivedEvent.getNotification();

      setNotification(response);
    })

    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      {notification?.title && <Notification title={notification.title} onClose={() => setNotification(null)} />}
    </NativeBaseProvider>
  );
}
